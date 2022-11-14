<template>
  <Draggable
    :model-value="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    handle=".handle"
    item-key="id"
    class="gallery"
    :class="classes[modelValue.length]">
    <template #item="{ element, index }">
      <div class="handle relative">
        <img :src="element.url" alt="" class="block aspect-square object-cover">
        <div @click="onDelete(index)" class="absolute top-0 right-0 p-0.5 m-1 p cursor-pointer rounded-lg bg-black bg-opacity-75">
          <XMarkIcon class="w-5 h-5 text-white" />
        </div>
      </div>
    </template>
  </Draggable>
</template>

<script setup>
import '../gallery.scss'
import Draggable from 'vuedraggable'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { computed, ref, watch, nextTick } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type:     Array,
    required: true,
  },
})

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

const onDelete = (index) => {
  if (props.modelValue.length > 0) {
    props.modelValue.splice(index, 1)
  }
}
</script>