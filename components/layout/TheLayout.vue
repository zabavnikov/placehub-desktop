<template>
  <main class="flex-auto flex flex-col gap-6">
    <h1 v-if="heading" class="text-2xl font-semibold">{{ heading }}</h1>
    <div v-if="!!$slots.top">
      <slot name="top"></slot>
    </div>
    <div class="flex-auto flex gap-6" :class="{'flex-row-reverse': reverse}">
      <div class="flex-shrink-0 min-w-[528px] w-[528px]">
        <slot></slot>
      </div>
      <div class="flex-shrink-0 flex-1">
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
    </div>
  </main>
</template>

<script lang="ts" setup>
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