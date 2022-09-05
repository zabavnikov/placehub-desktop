<template>
  <nav class="relative">
    <div class="sticky top-14">
      <NuxtLink v-if="$auth.loggedIn"
                class="block bg-gray-300/50 text-center py-1 px-2 rounded"
                :to="{name: 'users.show', params: {userId: $auth.user.id}}">Написать</NuxtLink>
    </div>
  </nav>
</template>