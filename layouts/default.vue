<template>
  <div class="flex flex-col items-center min-h-full">
    <TheHeader />

    <div class="container flex flex-auto">
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