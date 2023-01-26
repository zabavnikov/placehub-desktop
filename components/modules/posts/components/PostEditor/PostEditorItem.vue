<template>
  <article>
    <Swiper>
      <SwiperSlide v-for="image in images">
        <img :src="image.url" alt="" />
      </SwiperSlide>
    </Swiper>
    <TipTap :model-value="text" @update:modelValue="emit('update:text', $event)" />

    <!-- Загрузка изображений. -->
    <div>
      <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500" @click="$refs.upload.$el.click()">
        Создать слайдер
      </button>
      <Upload
          :fields="['id', 'url']"
          :presets="['default@width:640,height:480']"
          class="hidden"
          model-type="posts"
          ref="upload"
          @update:modelValue="addImages"
      />
    </div>
    <!-- / Загрузка изображений. -->
  </article>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const emit = defineEmits(['update:images', 'update:text'])

const props = defineProps({
  images: {
    type: Array,
  },
  text: {
    type: String
  }
})

const addImages = (images) => {
  const newImages = [...props.images]
  images.forEach((image) => newImages.push(image))
  emit('update:images', newImages)
}
</script>