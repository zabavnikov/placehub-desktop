<template>
  <div class="prose prose-sm" v-html="post.text"></div>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>