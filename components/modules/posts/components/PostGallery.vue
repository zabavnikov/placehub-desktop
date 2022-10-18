<template>
  <div class="gallery" :class="classes[images.length]">
    <div v-for="image in images" :key="image.id">
      <img :src="image.url" alt="" class="block object-cover">
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  images: {
    type:     Array,
    required: true,
  }
})

const classes = {
  2: 'gallery-grid-2',
  3: 'gallery-grid-3',
  4: 'gallery-grid-4',
  5: 'gallery-grid-5',
  6: 'gallery-grid-6'
}
</script>

<style lang="scss">
.gallery {
  @apply grid gap-px relative max-h-[360px] overflow-hidden  rounded-lg;

  > div {
    overflow: hidden;
  }

  img {
    width: 100%;
  }

  &-grid-2 {
    @apply grid-cols-2;

    > div img {
      height: 240px;
    }
  }

  &-grid-3 {
    @apply grid-rows-2 grid-flow-col;

    > div:first-child {
      @apply row-span-2;

      img {
        height: 100%;
      }
    }

    > div:nth-child(2),
    > div:nth-child(3), {
      @apply col-span-1;

      img {
        height: 180px;
      }
    }
  }

  &-grid-4 {
    @apply grid-cols-2;
    max-height: none;

    > div {
      img {
        @apply aspect-square;
      }
    }
  }

  &-grid-5 {
    @apply grid-cols-6;
    max-height: none;

    > div:first-child,
    > div:nth-child(2) {
      @apply col-span-3;

      img {
        @apply aspect-square;
      }
    }

    > div:nth-child(3),
    > div:nth-child(4),
    > div:nth-child(5), {
      grid-column: 2 span / 2 span;

      img {
        @apply aspect-square;
      }
    }
  }

  &-grid-6 {
    @apply grid-cols-6;
    max-height: none;

    > div {
      @apply col-span-2;

      img {
        @apply aspect-square;
      }
    }
  }
}
</style>