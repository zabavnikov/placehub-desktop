<template>
  <div class="gallery" :class="classes[images.length]">
    <img v-for="image in items" :key="image.id" :src="image.url" alt="" class="block object-cover w-full">
  </div>
</template>

<script setup>
const props = defineProps({
  images: {
    type:     Array,
    required: true,
  }
})

const items = props.images.sort(function(a, b) {
  return a.aspect_ratio - b.aspect_ratio;
})

const classes = {
  2: 'gallery-grid-2',
  3: 'gallery-grid-3'
}
</script>

<style lang="scss">
.gallery {
  @apply grid gap-0.5 relative -mx-6 max-h-[360px] overflow-hidden;

  &-grid-2 {
    @apply grid-cols-2;

    > img {
      height: 240px;
    }
  }

  &-grid-3 {
    @apply grid-rows-2 grid-flow-col;

    > img:first-child {
      @apply row-span-2;
      height: 100%;
    }

    > img:nth-child(2),
    > img:nth-child(3), {
      @apply col-span-1;
      height: 180px;
    }
  }
}
</style>