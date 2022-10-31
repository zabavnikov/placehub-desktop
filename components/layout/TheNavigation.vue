<template>
  <nav class="relative">
    <div class="sticky top-14">
      <NuxtLink v-if="$auth.loggedIn"
                class="block bg-gray-300/50 text-center py-1 px-2 rounded" to="/">Написать</NuxtLink>
      <ul class="mt-1">
        <li>
          <NuxtLink :to="{name: 'users'}">Пользователи</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>