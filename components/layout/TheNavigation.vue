<template>
  <nav class="nav relative">
    <div class="sticky top-16">
      <NuxtLink v-if="$auth.loggedIn" class="block bg-gray-300/50 text-center py-1 px-2 rounded" to="/">Написать</NuxtLink>
      <ul class="mt-4 space-y-px">
        <li v-for="link in links">
          <NuxtLink :to="link.href" class="p-2.5 text-indigo-800 rounded-lg flex items-center space-x-2">
            <Component :is="link.icon" class="w-5 h-5"></Component>
            <span>{{ link.text }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { Activity, Users } from 'lucide-vue-next'

const links = [
  {href: '/', text: 'Лента', icon: Activity},
  {href: {name: 'users'}, text: 'Пользователи', icon: Users}
]
</script>

<style lang="scss">
.nav {
  ul li a {
    &.router-link-active {
      @apply bg-indigo-100;
    }
  }
}
</style>