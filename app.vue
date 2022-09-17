<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Overlay />
</template>

<script setup>
import { Overlay } from '@placehub/ui'
</script>