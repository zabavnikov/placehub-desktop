<template>
  <NuxtLink :to="{name: 'posts.show', params: {postId: post.id}}" class="prose prose-sm block" v-html="post.text"></NuxtLink>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>