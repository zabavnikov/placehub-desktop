<template>

  <div class="container flex flex-auto divide-x divide-neutral-800">
    <TheNavigation class="sidebar" />
  <main class="main flex divide-x divide-neutral-800" :class="{'flex-row-reverse': reverse}">
    <div class="content">
      <slot></slot>
    </div>

    <div class="sidebar">
      <slot name="sidebar">
        <h3 class="font-medium text-lg">Популярные теги</h3>
        <ul class="mt-1 space-y-1">
          <li v-for="tag in store.tagsMentions" :key="tag.name">
            <nuxt-link :to="`/search/${tag.name}`">#{{ tag.name }}</nuxt-link>
            <div class="text-xs text-gray-400">упоминаний {{ tag.mentions_count }}</div>
          </li>
        </ul>
      </slot>
    </div>
  </main>
  </div>
</template>

<script lang="ts" setup>
import TheNavigation from '~/components/layout/TheNavigation'
import { useMainStore } from '~/stores'

const props = defineProps({
  reverse: {
    type: Boolean
  },
  heading: {
    type: String
  }
})

const store = useMainStore()
</script>