<template>
  <div class="flex flex-col items-center min-h-full">
    <TheHeader />
    <slot />
    <TheFooter class="mt-auto w-full" />
  </div>
</template>


<script setup>
import TheHeader from '~/components/layout/TheHeader'
import TheFooter from '~/components/layout/TheFooter'
</script>