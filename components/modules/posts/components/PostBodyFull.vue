<template>
  <h1 v-if="post.title" class="mb-2 text-xl font-medium">{{ post.title }}</h1>
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