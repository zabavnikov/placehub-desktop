<template>
  <main class="flex-auto flex flex-col gap-6">
    <h1 v-if="heading" class="text-2xl font-semibold">{{ heading }}</h1>
    <div v-if="!!$slots.top">
      <slot name="top"></slot>
    </div>
    <div class="flex-auto flex gap-6" :class="{'flex-row-reverse': reverse}">
      <div class="flex-shrink-0 min-w-[528px]" :class="[!!$slots.sidebar ? 'w-[528px]' : 'w-full']">
        <slot></slot>
      </div>
      <div v-if="!!$slots.sidebar" class="flex-shrink-0 flex-1">
        <slot name="sidebar"></slot>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
const props = defineProps({
  reverse: {
    type: Boolean
  },
  heading: {
    type: String
  }
})
</script>