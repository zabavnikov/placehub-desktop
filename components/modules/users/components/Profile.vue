<template>
  <div class="flex">
    <nuxt-link :to="{name: 'users.show', params: {userId: profile.id }}">
      <img :src="profile.avatar" :alt="profile.name" class="block w-10 h-10 rounded-full">
    </nuxt-link>
    <div v-if="!!$slots['footer']" class="ml-2 text-sm">
      <nuxt-link :to="{name: 'users.show', params: {userId: profile.id }}" class="font-semibold inline-block">{{ profile.name }}</nuxt-link>
      <div class="text-gray-600">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  profile: {
    type: Object,
    required: true
  },
})
</script>