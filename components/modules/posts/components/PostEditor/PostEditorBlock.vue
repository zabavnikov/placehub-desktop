<template>
  <article>
    <div v-show="! isEdit">
      <Swiper class="rounded-lg">
        <SwiperSlide v-for="image in images" :key="image.id" class="flex bg-gray-50 justify-center">
          <img :src="image.url" alt="" @click="isEdit = true" class="h-[360px] object-cover" />
        </SwiperSlide>
      </Swiper>
      <TipTap :model-value="text" @update:modelValue="emit('update:text', $event)" />
    </div>
    <div v-show="isEdit" class="bg-gray-50 p-4 rounded-lg">
      <h3 class="mb-4 font-medium text-lg">Редактирование</h3>
      <Draggable :model-value="images" @update:modelValue="emit('update:images', $event)" item-key="id" class="grid grid-cols-4 gap-4">
        <template #item="{ element }">
          <div class="aspect-square cursor-move">
            <img :src="element.url" alt="" class="object-cover rounded-lg w-full h-full" />
          </div>
        </template>
        <template #footer>
          <button class="bg-gray-200 hover:bg-indigo-400 transition-colors aspect-square rounded-lg" type="button" @click="$refs.upload.$el.click()">
            {{ images.length > 1 ? 'Добавить изображение' : 'Создать слайдер' }}
          </button>
        </template>
      </Draggable>

      <!-- Загрузка изображений. -->
      <div class="mb-4">
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

      <div class="flex justify-end">
        <Button @click="isEdit = false">Готово</Button>
      </div>
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