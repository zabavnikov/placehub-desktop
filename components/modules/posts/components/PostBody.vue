<template>
  <NuxtLink v-if="post.title" :to="{name: 'posts.show', params: {postId: post.id}}" class="prose prose-sm block font-bold mb-2">{{ post.title }}</NuxtLink>
  <NuxtLink :to="{name: 'posts.show', params: {postId: post.id}}" class="prose prose-sm block">{{ post.text }}</NuxtLink>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>