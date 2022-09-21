<template>
  <div class="flex items-center relative">
    <img :src="images[active].url" alt="" class="block object-cover h-[320px] w-full rounded-lg">
    <div
      v-show="images.length && active > 0"
      class="cursor-pointer absolute z-10 bg-black bg-opacity-80 rounded-full p-1 ml-2"
      @click="onClickPrevious"
    >
      <ChevronLeftIcon class="w-6 h-6 text-white" />
    </div>
    <div
      v-show="active < (images.length - 1)"
      class="cursor-pointer absolute right-0 z-10 bg-black bg-opacity-80 rounded-full p-1 mr-2"
      @click="onClickNext"
    >
      <ChevronRightIcon class="w-6 h-6 text-white" />
    </div>
    <div
        v-show="images.length > 1"
        class="bottom-0 right-0 absolute z-10 bg-black bg-opacity-80 rounded-full mr-2 py-1 px-2 mb-2 text-white text-xs font-medium"
    >
      {{ active + 1 }} из {{ images.length }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  images: {
    type: Array,
    required: true,
  }
})

const active = ref(0)

const onClickNext = () => {
  if (active.value < props.images.length - 1) {
    active.value++
  } else {
    active.value = 0
  }
}
const onClickPrevious = () => {
  if (active.value > 0) {
    active.value--
  } else {
    active.value = props.images.length - 1
  }
}
</script>