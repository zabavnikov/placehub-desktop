<template>
  <div class="flex items-center bg-white rounded-lg h-48 p-6 overflow-hidden">

    <div class="flex items-center space-x-6">
      <img :src="profile.avatar" :alt="profile.name" class="rounded-full" />
      <div class="truncate">
        <h1 class="text-2xl">{{ profile.name }}</h1>
        <nuxt-link
            v-if="$auth.loggedIn && parseInt(profile.id) === parseInt($auth.user.id)"
            :to="{name: 'users.edit', params: {userId: profile.id}}" class="text-green-500 underline">Редактировать</nuxt-link>
        <div v-if="profile.description" class="mt-2">{{ profile.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  profile: {
    type: Object,
    required: true,
  }
})
</script>