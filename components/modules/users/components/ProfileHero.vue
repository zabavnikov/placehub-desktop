<template>
  <div>
    <div class="h-60 relative">
      <div class="w-full h-full rounded-t-lg relative bg-gray-300/50">
        <img v-show="user.cover !== null" :src="user.cover" :alt="user.name" class="w-full h-full rounded-t-lg" />
        <UserUpload @uploaded="user.cover = $event" type="cover" class="absolute z-20 top-0 right-0 m-4 p-2 cursor-pointer bg-gray-300/80 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
        </UserUpload>
        <div class="rounded-full w-40 h-40 bottom-0 -mb-20 ml-8 absolute overflow-hidden z-10">
          <img
              :src="user.avatar"
              :alt="user.name"
              class="block" />
          <UserUpload @uploaded="user.avatar = $event" type="avatar" class="absolute z-20 top-2 right-2 m-4 p-2 cursor-pointer bg-gray-300/80 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          </UserUpload>
        </div>
      </div>
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
import UserUpload from '~/components/UserUpload'
defineProps({
  user: {
    type: Object,
    required: true,
  }
})
</script>