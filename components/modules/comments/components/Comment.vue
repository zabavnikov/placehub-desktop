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
          <div v-if="comment.can_update || comment.can_delete" class="ml-auto flex items-center space-x-1">
            <Pencil v-if="comment.can_update" @click="onEdit" class="cursor-pointer w-4 h-4 text-gray-500" />
            <Trash v-if="comment.can_delete" @click="onDelete" class="cursor-pointer w-4 h-4 text-gray-500" />
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
        <p @click="onReply" class="cursor-pointer underline">ответить</p>
<!--        <v-like
            :model-type="`${comment.model_type}_comments`"
            :model-id="comment.id"
            :count="comment.likes_count"
            :is-liked="comment.like.is_liked"
        />-->
<!--        <CommentVoteButtons
          model-type="posts"
          :model-id="comment.id"
          :rating="comment.rating"
          :vote="comment.vote"
          :votes-up-count="comment.votes_up_count"
          :votes-down-count="comment.votes_down_count"
        />-->
        <div v-if="comment.branch_replies_count > 0" @click="$emit('toggle-replies')" class="flex items-center space-x-2 cursor-pointer">
          <MoreHorizontal class="w-4 h-4" />
          <div class="font-semibold">{{ comment.branch_replies_count }} ответов</div>
        </div>
      </footer>
    </section>

    <CommentForm
        v-if="showForm"
        :comment="isEdit ? comment : undefined"
        :parent-id="isReply ? comment.id : undefined"
        @created="onCreated"
        @updated="onUpdated"
        class="mt-2"
    />
  </article>
</template>

<script setup>
import CommentForm from './CommentForm'
import CommentReplyPopover from './CommentReplyPopover'
import CommentVoteButtons from './CommentVoteButtons'
import { defineAsyncComponent } from 'vue'
import { ref, computed } from 'vue'
import { useCommentsStore } from '../store.ts'
import { useNuxtApp } from '#app/nuxt'
import { MoreHorizontal, Pencil, Trash } from 'lucide-vue-next'

const emit = defineEmits(['toggle-replies', 'deleted'])

const { comment } = defineProps({
  comment: {
    type:     Object,
    required: true,
  }
})

const { $overlay, $auth } = useNuxtApp()

const store = useCommentsStore()

const mode = ref(null)
const loading = ref(false)
const isEdit  = computed(() => mode.value === 'edit')
const isReply = computed(() => mode.value === 'reply')
const isOwner = computed(() => $auth.loggedIn && parseInt($auth.user.id) === parseInt(comment.user_id))
const isEditCurrent = computed(() => store.activeForm === comment.id && isEdit.value)

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

const onDelete = () => {
  $overlay.show(defineAsyncComponent(() => import('~/components/common/DeleteConfirmDialog.vue')), {
    props: {
      title:  'Удалить комментарий?',
      text:   'После удаления комментарий нельзя будет восстановить.',
      mutation: `
        mutation($id: Int!) {
          deleteComment(id: $id)
        }
      `,
      mutationName: 'deleteComment',
      variables: {
        id: comment.id
      }
    },
    on: {
      deleted() {
        comment.text = 'Комментарий удален'
        $overlay.hide()
      }
    }
  })
}
</script>