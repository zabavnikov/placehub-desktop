<template>
  <div>
    <div @click="calc" class="text-right cursor-pointer mb-1 underline">Нажмите, чтобы сгенерировать другой вариант раскладки</div>
    <div class="relative diorama" style="height: 480px;">
      <div v-for="image in imgs" :style="{
        top: (image.top / 480) * 100 + '%',
        left: (image.left / 480) * 100 + '%',
        width: (image.width / 480) * 100 + '%',
        height: (image.height / 480) * 100 + '%',
    }">
        <div :style="{
        backgroundImage: `url(${image.src})`
    }">
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.diorama > div > div {
  background-size: cover;
  background-color: white;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  width: 100%;
  height: 100%;
}
.diorama {
  @apply rounded-lg;
  overflow: hidden;
}
.diorama > div {
  border: 1px solid #fff;
  border-collapse: collapse;
  position: absolute;
}
</style>

<script lang="ts">
import { searchSolution } from '~/components/diorama'

export default {
  props: {
    images: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      imgs: []
    }
  },
  watch: {
    images: {
      handler() {
        this.calc()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    calc() {
      this.imgs = searchSolution(480, 480, this.images.map(image => {
        return image.aspect_ratio
      }), 250);

      if (Array.isArray(this.imgs)) {
        this.imgs = this.imgs.sort((a, b) => a.index - b.index)
            .map(p => ({
              src: this.images[p.index].url,
              top: p.y,
              left: p.x,
              width: p.width,
              height: p.height
            }))
      }
    }
  }
}
</script>