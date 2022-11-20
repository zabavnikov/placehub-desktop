<template>
  <div class="flex flex-col items-center min-h-full">
    <TheHeader />

    <div class="flex flex-auto gap-4 mb-4 container">
      <TheNavigation class="sidebar"/>
      <slot />
    </div>
    <TheFooter class="mt-auto w-full" />
  </div>
</template>


<script setup>
import TheFooter from '~/components/layout/TheFooter'
import TheHeader from '~/components/layout/TheHeader'
import TheNavigation from '~/components/layout/TheNavigation'
</script>