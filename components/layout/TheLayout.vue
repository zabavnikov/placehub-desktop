<template>
  <main class="main flex-col gap-6">
    <div v-if="!!$slots['hero']" class="flex-1">
      <slot name="hero"></slot>
    </div>

    <div class="flex flex-auto gap-6" :class="{'flex-row-reverse': reverse}">
      <div class="main-content">
        <h3 v-if="heading" class="font-medium text-lg mb-4">{{ heading }}</h3>
        <slot></slot>
      </div>

      <div class="main-sidebar">
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