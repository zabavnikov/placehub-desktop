<template>
  <article class="post p-6">
    <div class="flex">
      <nuxt-link to="/">
        <img :src="content.user.avatar" :alt="content.user.name" class="block w-10 h-10 rounded-full">
      </nuxt-link>
      <div class="ml-2 text-sm">
        <nuxt-link to="/" class="font-semibold inline-block">{{ content.user.name }}</nuxt-link>
        <div class="text-gray-600">{{ content.created_at }}</div>
      </div>
    </div>
    <component
      class="mt-4"
      :is="full
        ? PostBodyFull
        : PostBody"
      :post="content"
    >
    </component>
  </article>
</template>

<script setup>
import PostBody from './PostBody.vue'
import PostBodyFull from './PostBodyFull.vue'

defineProps({
  content: {
    type: Object,
    required: true
  },
  full: {
    type: Boolean,
    default: false
  }
})
</script>