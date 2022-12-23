<template>
  <div v-if="!!$slots['hero']" class="mb-6">
    <slot name="hero"></slot>
  </div>

  <div class="grid grid-cols-3 gap-6" :class="{'flex-row-reverse': reverse}">
    <div class="col-span-2">
      <h3 v-if="heading" class="font-medium text-lg mb-4">{{ heading }}</h3>
      <slot></slot>
    </div>

    <div class="col-span-1">
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