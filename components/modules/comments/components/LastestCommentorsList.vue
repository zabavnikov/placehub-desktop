<template>
  <ul class="flex items-center">
    <li v-for="(user, index) in commentators" :key="user.id"
        :class="{'-ml-2': index > 0}">
      <img
        :src="user.avatar"
        :alt="user.name"
        :title="user.name"
        width="20"
        height="20"
        class="block rounded-full"
      >
    </li>
    <li class="ml-1 text-xs font-medium text-gray-600">
      <NuxtLink :to="{name: 'posts.show', params: {postId}, hash: '#comments'}">
        {{ count === 0 ? 'никто не отвечал' : '' }}
        {{ count === 1 ? '1 ответ' : '' }}
        {{ count > 1 ? `и еще ${count - commentators.length} ответа` : '' }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  commentators: {
    type: Array,
    default: () => []
  },
  count: {
    type: Number,
    default: 0
  },
  postId: {
    type: Number,
    required: true
  }
})
</script>