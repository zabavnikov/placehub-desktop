<template>
  <article>
    <div v-show="! isEdit">
      <Swiper>
        <SwiperSlide v-for="image in images" :key="image.id">
          <img :src="image.url" alt="" @click="isEdit = true" />
        </SwiperSlide>
      </Swiper>
      <TipTap :model-value="text" @update:modelValue="emit('update:text', $event)" />
    </div>
    <div v-show="isEdit">
      <Draggable :model-value="images" @update:modelValue="emit('update:images', $event)" item-key="id" class="grid grid-cols-4 gap-4">
        <template #item="{ element }">
          <div class="aspect-square cursor-move">
            <img :src="element.url" alt="" class="object-cover rounded-lg w-full h-full" />
          </div>
        </template>
        <template #footer>
          <button class="bg-amber-100 aspect-square rounded-lg" type="button" @click="$refs.upload.$el.click()">Добавить изображение</button>
        </template>
      </Draggable>

      <div @click="isEdit = false">Отмена</div>
      <!-- Загрузка изображений. -->
      <div>
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
    </div>
  </article>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import Draggable from 'vuedraggable'

import 'swiper/css'

const emit = defineEmits(['update:images', 'update:text', 'dialog'])

const props = defineProps({
  images: {
    type: Array,
  },
  text: {
    type: String
  }
})

const isEdit = ref(false)

const addImages = (images) => {
  const newImages = [...props.images]
  images.forEach((image) => newImages.push(image))
  emit('update:images', newImages)
}

const deleteImage = (index) => {
  const newImages = [...props.images]
  newImages.splice(index, 1)
  emit('update:images', newImages)
}
</script>