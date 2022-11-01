<template>
  <div class="flex flex-col items-center min-h-full">
    <TheHeader />
    <div class="container flex flex-auto divide-x divide-gray-200">
      <TheNavigation />
      <slot />
    </div><!--
    <div class="flex-auto flex flex-col w-full max-w-[1000px] mx-auto">
      <div class="flex-auto flex">
        <slot />
      </div>
    </div>-->
    <TheFooter class="mt-auto w-full" />
  </div>
</template>


<script setup>
import TheHeader from '~/components/layout/TheHeader'
import TheFooter from '~/components/layout/TheFooter'
import TheNavigation from '~/components/layout/TheNavigation'
</script>