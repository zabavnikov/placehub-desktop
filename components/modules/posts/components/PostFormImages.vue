<template>
  <draggable v-model="modelValue" @update:modelValue="$emit('update:modelValue', $event)"  handle=".handle" item-key="id" class="relative grid gap-0.5 grid-cols-4 overflow-hidden rounded-lg">
    <template #item="{ element, index }">
      <div class="handle relative">
        <img :src="element.url" alt="" class="block aspect-square object-cover">
        <div @click="onDelete(index)" class="absolute top-0 right-0 p-0.5 m-1 p cursor-pointer rounded-lg bg-black bg-opacity-75">
          <XMarkIcon class="w-5 h-5 text-white" />
        </div>
      </div>
    </template>
  </draggable>
</template>

<script setup>
import Draggable from 'vuedraggable'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
})

const onDelete = (index) => {
  console.log(props.modelValue.length)
  if (props.modelValue.length <= 1) {
    emit('update:modelValue', [])
  } else {
    emit('update:modelValue', props.modelValue.splice(index, 1))
  }
}
</script>
