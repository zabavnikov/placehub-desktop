<template>
  <div>
    <draggable v-model="modelValue" @update:modelValue="$emit('update:modelValue', $event)"  handle=".handle" item-key="id" class="gallery" :class="classes[newSize.length]">
      <template #item="{ element, index }">
        <div class="handle relative" @click="addToGallery(element)">
          <img :src="element.url" alt="" class="block aspect-square object-cover">
          <div @click="onDelete(index)" class="absolute top-0 right-0 p-0.5 m-1 p cursor-pointer rounded-lg bg-black bg-opacity-75">
            <XMarkIcon class="w-5 h-5 text-white" />
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import '../gallery.scss'
import Draggable from 'vuedraggable'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { ref, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
})

const newSize = ref(props.modelValue)

const classes = computed(() => {
  return {
    2:  'gallery-grid-2',
    3:  'gallery-grid-3',
    4:  'gallery-grid-4',
    5:  'gallery-grid-5',
    6:  'gallery-grid-6',
    7:  'gallery-grid-7',
    8:  'gallery-grid-8',
    9:  'gallery-grid-9',
    10: 'gallery-grid-10'
  }
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
    emit('update:modelValue', newSize.value = props.modelValue.splice(index, 1))
  }
}
</script>