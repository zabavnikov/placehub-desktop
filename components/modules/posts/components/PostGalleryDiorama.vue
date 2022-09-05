<template>
  <div>
    <div @click="calc" class="text-right cursor-pointer mb-1 underline">Нажмите, чтобы сгенерировать другой вариант раскладки</div>
    <div v-if="imgs.length === images.length" class="relative diorama" style="height: 300px;">
      <div v-for="image in imgs" :style="{
        top: (image.top / 300) * 100 + '%',
        left: (image.left / 600) * 100 + '%',
        width: (image.width / 600) * 100 + '%',
        height: (image.height / 300) * 100 + '%',
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
  margin: -1px;
  @apply rounded-lg;
  overflow: hidden;
}
.diorama > div {
  padding: 1px;
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
    'images'() {
      this.calc()
    }
  },
  mounted() {
    this.calc()
  },
  methods: {
    calc() {

      const post = searchSolution(600, 300, this.images.map(image => {
        return image.aspect_ratio
      }), 100);

      if (post) {
        this.imgs = post.sort((a, b) => a.index - b.index)
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