<template>
  <div class="space-y-4">
    <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<script>
import Comment from './Comment'

export default {
  props: {
    comments: {
      type: Array,
      default: () => [],
    }
  },
  components: {
    Comment,
  },
}
</script>