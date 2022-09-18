<template>
  <div>
    <draggable v-model="modelValue" @update:modelValue="$emit('update:modelValue', $event)"  handle=".handle" item-key="id" class="relative grid gap-0.5 grid-cols-4 overflow-hidden rounded-lg">
      <template #item="{ element, index }">
        <div class="handle relative" @click="addToGallery(element)">
          <img :src="element.url" alt="" class="block aspect-square object-cover">
          <div @click="onDelete(index)" class="absolute top-0 right-0 p-0.5 m-1 p cursor-pointer rounded-lg bg-black bg-opacity-75">
            <XMarkIcon class="w-5 h-5 text-white" />
          </div>
        </div>
      </template>
    </draggable>
    <PostGalleryDiorama v-if="gallery.length > 0" :images="gallery" />
  </div>
</template>

<script setup>
import Draggable from 'vuedraggable'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import PostGalleryDiorama from './PostGalleryDiorama.vue'
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
})

const gallery = ref([])

const addToGallery = (image) => {
  if (gallery.value.length <= 5) {
    gallery.value.push(image)
    gallery.value.forEach((item) => {
      console.log(item)
     /* if (parseInt(item.id) !== parseInt(image.id)) {
        gallery.value.push(image)
      }*/
    })
  }
}

const onDelete = (index) => {
  if (props.modelValue.length <= 1) {
    emit('update:modelValue', [])
  } else {
    emit('update:modelValue', props.modelValue.splice(index, 1))
  }
}
</script>
