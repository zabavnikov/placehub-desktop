<template>
  <div>
    <div class="h-60 relative">
      <img :src="user.cover" :alt="user.name" class="w-full h-full rounded-t-lg" />
      <img
        :src="user.avatar"
        :alt="user.name"
        class="rounded-full w-40 h-40 bottom-0 -mb-20 ml-8 absolute block" />
    </div>
    <div class="py-6 pl-48 pr-8 bg-white border border-neutral-100 rounded-b-lg overflow-hidden">
      <div class="ml-4">
        <h2 class="flex items-center space-x-2">
          <span class="font-bold text-xl">{{ user.name }}</span>
          <NuxtLink :to="{name: 'users.edit', params: {userId: user.id}}">редактировать</NuxtLink>
        </h2>
        <div class="truncate">{{ user.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  }
})
</script>