<template>
  <article class="flex space-x-2">
    <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}">
      <img :src="comment.user.avatar" :alt="comment.user.name" class="w-10 h-10">
    </nuxt-link>
    <section>
      <p>{{ comment.text }}</p>
      <footer class="flex text-red-700 text-sm">
        <p @click="isReply = !isReply">Ответить</p>
      </footer>
      <comment-form model-id="" model-type="" />
    </section>
  </article>
</template>

<script>
import { ref } from 'vue'
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

  setup() {
    return {
      isReply: ref(false)
    }
  }
}
</script>