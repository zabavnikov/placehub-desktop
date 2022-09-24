<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Overlay />
</template>

<script setup>
import { onServerPrefetch } from 'vue'
import { useMainStore } from '~/stores/index'
import { Overlay } from '@placehub/ui'
import { useAsyncGql } from '~/uses'

const store = useMainStore()

onServerPrefetch(async () => {
  const { data } = await useAsyncGql(`
    query {
      tags {
        mentions_count
        name
      }
    }
  `)

  store.$patch({
    tagsMentions: data.value.tags
  })
})
</script>