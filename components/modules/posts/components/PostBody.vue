<template>
  <nuxt-link :to="{name: 'posts.show', params: {postId: post.id}}" class="inline-block">{{ post.text }}</nuxt-link>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>