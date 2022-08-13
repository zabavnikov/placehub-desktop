<template>
  <article class="flex space-x-2">
    <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}">
      <img :src="comment.user.avatar" :alt="comment.user.name" class="w-10 h-10">
    </nuxt-link>
    <section>
      <p>{{ comment.text }}</p>
      <footer class="flex text-red-700 text-sm">
        <p @click="onReply">Ответить</p>
      </footer>
      <comment-form v-if="isReply" />
    </section>
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