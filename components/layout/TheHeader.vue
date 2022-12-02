<template>
  <header class="header sticky top-0 z-10 h-12 bg-neutral-200 flex justify-center w-full">
    <div class="container">
      <div class="sidebar">
        <NuxtLink to="/">PLACEHUB</NuxtLink>
      </div>
      <div class="main">
        <div class="main-content">
          <input type="search" class="w-full h-full p-2 bg-transparent focus:outline-none" placeholder="Поиск">
        </div>
        <div class="main-sidebar">
          <NuxtLink to="/login">login</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>