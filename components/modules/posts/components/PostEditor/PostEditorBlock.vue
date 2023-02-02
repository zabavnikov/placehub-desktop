<template>
  <article>
    <div v-show="! isEdit">
      <div class="rounded-lg relative bg-gray-50">
        <div @click="emit('deleteBlock')" class="cursor-pointer z-10 transition absolute right-2 top-2 h-10 w-10 bg-black/50 flex items-center justify-center rounded-full">
          <Trash class="w-5 h-5 text-white" />
        </div>
        <div title="Создать карусель" @click="isEdit = true" class="cursor-pointer z-10 transition absolute right-14 top-2 h-10 w-10 bg-black/50 flex items-center justify-center rounded-full">
          <ImagePlus class="w-5 h-5 text-white" />
        </div>
        <Swiper class="aspect-video" :space-between="1" :class="[images.length > 1 ? 'cursor-move' : '']">
          <SwiperSlide v-for="image in images" :key="image.id" class="flex bg-gray-50 justify-center">
            <img :src="image.url" alt="" class="h-full object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
      <TipTap :model-value="text" @update:modelValue="emit('update:text', $event)" placeholder="Добавить текст" class="mt-2" />
    </div>
    <div v-show="isEdit" class="bg-gray-50 p-4 rounded-lg">
      <h3 class="mb-4 font-medium text-lg">Редактирование</h3>
      <Draggable :model-value="images" @update:modelValue="emit('update:images', $event)" item-key="id" class="grid grid-cols-4 gap-4">
        <template #item="{ element, index }">
          <div class="aspect-square relative">
            <img :src="element.url" alt="" class="object-cover rounded-lg w-full h-full cursor-move" />
            <button type="button" @click="deleteImage(index)" class="absolute top-2 right-2 bg-black/50 p-2 rounded-full">
              <Trash class="w-4 h-4 text-white" />
            </button>
          </div>
        </template>
        <template #footer>
          <button title="Создать карусель изображений" class="flex items-center justify-center bg-gray-200 hover:bg-indigo-300 hover:text-indigo-500 text-gray-400 transition-colors aspect-square rounded-lg" type="button" @click="$refs.upload.$el.click()">
            <ImagePlus class="w-12 h-12" />
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
import { ImagePlus, Trash } from 'lucide-vue-next'

import 'swiper/css'

const emit = defineEmits(['update:images', 'update:text', 'deleteBlock'])

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