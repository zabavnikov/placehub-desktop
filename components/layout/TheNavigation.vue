<template>
  <nav v-if="$auth.loggedIn">
    <NuxtLink
        class="block bg-gray-300/50 text-center py-1 px-2 rounded"
        :to="{name: 'users.show', params: {userId: $auth.user.id}}">Написать</NuxtLink>
  </nav>
</template>