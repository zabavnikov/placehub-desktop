<template>
  <div class="px-4 pt-4 pb-0" style="width: var(--main-width)">
    <div class="h-60 relative">
      <div class="w-full h-full rounded-t-lg relative bg-gray-300/50">
        <img v-show="user.cover !== null" :src="user.cover" :alt="user.name" class="w-full h-full rounded-t-lg" />
        <UserUpload @uploaded="user.cover = $event" type="cover" class="absolute z-20 top-0 right-0 m-4 p-2 cursor-pointer bg-gray-300/80 rounded-full">
          <Pencil class="w-4 h-4" />
        </UserUpload>
        <div class="rounded-full w-32 h-32 bottom-0 -mb-16 ml-8 absolute overflow-hidden z-10">
          <img
              :src="user.avatar"
              :alt="user.name"
              class="block" />
          <UserUpload @uploaded="user.avatar = $event" type="avatar" class="absolute z-20 top-2 right-2 m-4 p-2 cursor-pointer bg-gray-300/80 rounded-full">
            <Pencil class="w-4 h-4" />
          </UserUpload>
        </div>
      </div>
    </div>
    <div class="py-6 pl-40 pr-8 bg-white border border-neutral-100 rounded-b-lg overflow-hidden">
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
import { Pencil } from 'lucide-vue-next'
import UserUpload from '~/components/UserUpload'
defineProps({
  user: {
    type: Object,
    required: true,
  }
})
</script>