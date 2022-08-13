<template>
  <article>
    <div class="flex">
      <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}" class="mr-2">
        <img :src="comment.user.avatar" :alt="comment.user.name" class="w-10 h-10 bg-gray-300/50 rounded-full block">
      </nuxt-link>
      <section>
        <p class="text-sm">{{ comment.text }}</p>
        <footer class="flex text-red-700 text-sm flex space-x-4">
          <p @click="onReply">Ответить</p> / {{ comment.replies_count }}
        </footer>
        <comment-form v-if="isReply" />
      </section>
    </div>
    <div v-if="comment.replies" class="ml-10">
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
      comments.$patch(state => {
        state.form.parent_id = comment.id
      })
    }

    return {
      isReply: computed(() => comments.form.parent_id === comment.id),
      onReply
    }
  }
}
</script>