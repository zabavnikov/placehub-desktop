<template>
  <article>
    <header class="flex items-center">
      <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}" class="mr-3 flex-shrink-0">
        <img :src="comment.user.avatar" :alt="comment.user.name" class="w-8 h-8 bg-gray-300/50 rounded-full block">
      </nuxt-link>
      <div class="flex-auto">
        <div class="flex items-center space-x-1">
          <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}" class="font-semibold">
            {{ comment.user.name }}
          </nuxt-link>
          <span v-if="comment.parent" class="flex items-center space-x-1 text-gray-800">
            <span>ответ</span>
            <comment-reply-popover :comment="comment.parent">
              <template #button>
                <span class="text-indigo-500 cursor-pointer">{{ comment.parent.user.name }}</span>
              </template>
            </comment-reply-popover>
          </span>
<!--          <div v-if="isOwner" class="ml-auto flex items-center space-x-1">-->
          <div class="ml-auto flex items-center space-x-1">
            <pencil-icon @click="onEdit" class="cursor-pointer w-4 h-4 text-gray-500"></pencil-icon>
            <trash-icon @click="onDelete" class="cursor-pointer w-4 h-4 text-gray-500"></trash-icon>
          </div>
        </div>
        <div class="text-xs font-semibold text-gray-500">{{ comment.created_at }}</div>
      </div>
    </header>

    <section v-show="!isEditCurrent" class="mt-2">
      <p class="whitespace-pre-line leading-relaxed text-gray-900 overflow-hidden">
        {{ comment.text }}
      </p>

      <footer class="flex space-x-4 mt-2">
        <p @click="onReply" class="cursor-pointer">ответить</p>
<!--        <v-like
            :model-type="`${comment.model_type}_comments`"
            :model-id="comment.id"
            :count="comment.likes_count"
            :is-liked="comment.like.is_liked"
        />-->
        <CommentVoteButtons
          model-type="posts"
          :model-id="comment.id"
          :rating="comment.rating"
          :vote="comment.vote"
          :votes-up-count="comment.votes_up_count"
          :votes-down-count="comment.votes_down_count"
        />
      </footer>
      <div v-if="comment.branch_replies_count > 0" @click="$emit('toggle-replies')" class="flex items-center space-x-2 mt-2 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="m19.706 13.708-3 3a1 1 0 0 1-1.414-1.414L16.586 14H5a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4h10.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1-.001 1.415z" />
        </svg>
        <div class="font-semibold">{{ comment.branch_replies_count }} ответов</div>
      </div>
    </section>

    <CommentForm
      v-if="showForm"
      :comment="isEdit ? comment : undefined"
      :parent-id="isReply ? comment.id : undefined"
      @created="onCreated"
      @updated="onUpdated"
      class="mt-4"
    />
  </article>
</template>

<script>
import CommentReplyPopover from './CommentReplyPopover'
import CommentVoteButtons from './CommentVoteButtons'
import CommentForm from './CommentForm'
import { useCommentsStore } from '../stores/comments'
import { PencilIcon, TrashIcon, ChatBubbleLeftIcon } from '@heroicons/vue/24/solid'
import { ref, computed } from 'vue'
import { useGql } from '~/uses'
import { DELETE_COMMENT } from '../graphql';

export default {
  name: 'Comment',

  emits: ['toggle-replies', 'deleted'],

  components: {
    CommentVoteButtons,
    CommentReplyPopover,
    CommentForm,
    PencilIcon,
    TrashIcon,
    ChatBubbleLeftIcon
  },

  computed: {
    isEditCurrent() {
      return this.store.activeForm === this.comment.id && this.isEdit;
    },
    isOwner() {
      return this.$auth.loggedIn && parseInt(this.$auth.user.id) === parseInt(this.comment.user_id)
    }
  },

  props: {
    comment: {
      type:     Object,
      required: true,
    }
  },

  setup({ comment }, { $pinia }) {
    const store = useCommentsStore($pinia)

    const mode = ref(null)
    const loading = ref(false)
    const isEdit  = computed(() => mode.value === 'edit')
    const isReply = computed(() => mode.value === 'reply')

    const onEdit = () => {
      mode.value = 'edit'
      store.activeForm = comment.id
    }

    const onReply = () => {
      mode.value = 'reply'
      store.activeForm = comment.id
    }

    const showForm = computed(() => store.activeForm === comment.id && (isEdit.value || isReply.value))

    const onCreated = async (newComment) => {
      await store.addComment(newComment)
      mode.value = null
      store.activeForm = null
    }

    const onUpdated = (newComment) => {
      Object.assign(comment, newComment)
      mode.value = null
      store.activeForm = null
    }

    /*
      Удаление
     */
    const onDelete = async () => {
      if (loading.value) {
        return
      }

      loading.value = true

      try {
        const { data: { commentData } } = await useGql(DELETE_COMMENT, {
          id: parseInt(comment.id)
        })

        Object.assign(comment, commentData)
      } catch (error) {

      } finally {
        loading.value = false
      }
    }

    return {
      store,
      isEdit,
      isReply,
      showForm,
      onEdit,
      onReply,
      onCreated,
      onUpdated,
      onDelete,
    }
  }
}
</script>

<style>
.comment-branch::before {
  content: '';
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  display: block;
  width: 12px;
  height: var(--content-offset-top);
  padding-bottom: calc(var(--size-avatar)*.5 + var(--offset-avatar-top));
  border: solid var(--color-branch);
  border-width: 0 0 1px 1px;
  border-bottom-left-radius: 8px;
  margin-left: -1px;
}
</style>