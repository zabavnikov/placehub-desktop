<template>
  <article>
    <header class="flex items-center">
      <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}" class="mr-3 flex-shrink-0">
        <img :src="comment.user.avatar" :alt="comment.user.name" class="w-8 h-8 bg-gray-300/50 rounded-full block">
      </nuxt-link>
      <div>
        <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}">
          {{ comment.user.name }}
        </nuxt-link>
        <div class="text-xs text-gray-500">{{ comment.created_at }}</div>
      </div>
    </header>
    <section class="mt-2">
      <p class="leading-relaxed font-semibold text-gray-900">{{ comment.text }}</p>
      <footer class="flex text-red-700 text-sm flex space-x-4">
        <p @click="onReply">Ответить</p> / {{ comment.replies_count }}
      </footer>
      <comment-form v-if="isReplyForm" @cancel="form.parent_id = null" />
    </section>
    <div v-if="comment.replies" class="ml-8 mt-4 space-y-4">
      <comment v-for="reply in comment.replies" :comment="reply" :key="reply.id" />
    </div>
  </article>
</template>

<script>
import { computed } from 'vue'
import { useCommentsStore } from '../stores/comments'
import CommentForm  from './CommentForm'

export default {
  name: 'Comment',

  props: {
    comment: {
      type: Object,
      required: true,
    }
  },

  components: {
    CommentForm
  },

  setup({ comment }, { $pinia }) {
    const comments = useCommentsStore($pinia)

    const onReply = () => {
      comments.toggle(comment.id)
    }

    return {
      avatarClasses: [
        comment.parent_id > 0
          ? 'w-6 h-6'
          : 'w-8 h-8'
      ],
      isReplyForm: computed(() => comments.form.parent_id === comment.id),
      onReply
    }
  }
}
</script>