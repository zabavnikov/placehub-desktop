<template>
  <article :id="`comment-${comment.id}`">
    <header class="flex items-center">
      <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}" class="mr-3 flex-shrink-0">
        <img :src="comment.user.avatar" :alt="comment.user.name" class="w-8 h-8 bg-gray-300/50 rounded-full block">
      </nuxt-link>
      <div>
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
        </div>
        <div class="text-xs font-semibold text-gray-500">{{ comment.created_at }}</div>
      </div>
    </header>
    <p class="leading-relaxed font-semibold text-gray-900 mt-2 overflow-hidden" @click="onEdit">
      {{ comment.text }}
    </p>
    <footer class="flex space-x-4 mt-2">
      <div v-if="comment.branch_replies_count > 0" @click="$emit('toggle-replies')" class="cursor-pointer">
        в ветке {{ comment.branch_replies_count }} ответов
      </div>
      <p @click="store.replyTo(comment)" class="cursor-pointer">ответить</p>
      <v-like
        :model-type="`${comment.model_type}_comments`"
        :model-id="comment.id"
        :is-liked="comment.like.is_liked"
      />
    </footer>

    <CommentForm
      v-if="store.form.reply[store.isReply ? 'id' : 'parent_id'] === comment[store.isEdit ? 'parent_id' : 'id']"
      @created="onCreated"
      @updated="onUpdated"
      class="m-4"
    />
  </article>
</template>

<script>
import CommentReplyPopover from './CommentReplyPopover'
import CommentForm from './CommentForm'
import VLike from '~/components/library/VLike'
import { useCommentsStore } from '../stores/comments'

export default {
  name: 'Comment',

  emits: ['toggle-replies'],

  components: {
    CommentReplyPopover,
    CommentForm,
    VLike
  },

  props: {
    comment: {
      type:     Object,
      required: true,
    }
  },

  setup({ comment }, { $pinia }) {
    const store = useCommentsStore($pinia)

    const onEdit = () => {
      store.edit(comment)
    }

    const onCreated = async (newComment) => {
      await store.addComment(newComment)
    }

    const onUpdated = (newComment) => {
      Object.assign(comment, newComment)
      store.hideForm()
    }

    return {
      store,
      onEdit,
      onCreated,
      onUpdated,
    }
  }
}
</script>