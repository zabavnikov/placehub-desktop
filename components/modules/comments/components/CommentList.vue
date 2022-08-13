<template>
  <section class="space-y-4">
    <comment-form />
    <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
  </section>
</template>

<script>
import Comment from './Comment'
import CommentForm from './CommentForm'

export default {
  props: {
    comments: {
      type: Array,
      default: () => [],
    }
  },
  components: {
    Comment,
    CommentForm,
  },
}
</script>