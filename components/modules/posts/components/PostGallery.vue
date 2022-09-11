<template>
  <div class="grid gap-0.5 grid-cols-4 overflow-hidden rounded-lg">
    <img v-for="image in images" :key="image.id" :src="image.url" alt="" class="block aspect-square object-cover">
  </div>
</template>

<script lang="ts">
export default {
  props: {
    images: {
      type: Array,
      required: true,
    }
  },
}
</script>