<template>
  <div class="flex flex-col items-center min-h-full">
    <TheHeader />

    <div class="w-full max-w-screen-lg grid grid-cols-10 gap-6">
      <TheNavigation class="col-span-2" />
      <main class="col-span-8 gap-6">
        <slot />
      </main>
    </div>

    <TheFooter class="mt-auto w-full" />
  </div>
</template>


<script setup>
import TheFooter from '~/components/layout/TheFooter'
import TheHeader from '~/components/layout/TheHeader'
import TheNavigation from '~/components/layout/TheNavigation'
</script>