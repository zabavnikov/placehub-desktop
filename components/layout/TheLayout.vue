<template>
  <main class="flex-auto flex flex-col gap-4">
    <h1 v-if="heading" class="text-2xl font-semibold">{{ heading }}</h1>
    <div v-if="!!$slots.top">
      <slot name="top"></slot>
    </div>
    <div class="flex-auto flex gap-4" :class="{'flex-row-reverse': reverse}">
      <div class="flex-shrink-0 flex-auto w-full max-w-[540px]">
        <slot></slot>
      </div>
      <div v-if="!!$slots.sidebar" class="flex-shrink-0 flex-auto">
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