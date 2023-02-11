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

const store = useMainStore()

onServerPrefetch(async () => {
  const { data } = await useQuery({
    query: `
      query {
        tags {
          mentions_count
          name
        }
      }
    `
  })

  store.$patch({
    tagsMentions: data.tags
  })
})
</script>