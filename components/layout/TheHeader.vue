<template>
  <header class="header sticky top-0 z-50 h-12 bg-neutral-100/80 border-b border-b-slate-200 flex justify-center w-full">
    <div class="container-lg flex mx-auto gap-6">
      <div class="sidebar">
        <NuxtLink to="/" class="block w-full h-full flex flex-col justify-center">
          <span class="font-bold">PLACEHUB</span>
          <span class="text-xs text-gray-500">Путешествия и походы</span>
        </NuxtLink>
      </div>
      <div class="main">
        <div class="main-content">
<!--          <input type="search" class="w-full h-full p-2 bg-transparent focus:outline-none" placeholder="Поиск">-->
        </div>
        <div class="main-sidebar">
          <NuxtLink v-if="!$auth.loggedIn" to="/login">login</NuxtLink>
          <div v-else class="cursor-pointer flex items-center w-full h-full hover:bg-slate-200 transition-colors px-2 space-x-2" :title="$auth.user.name">
            <img :src="$auth.user.avatar" :alt="$auth.user.name" width="32" height="32" class="rounded-full" />
            <div class="truncate">{{ $auth.user.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>