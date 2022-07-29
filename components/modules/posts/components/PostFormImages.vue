<template>
  <div class="grid grid-cols-4 gap-2">
    <div v-for="(image, index) in modelValue" :key="image.id" class="handle relative aspect-square cursor-pointer">
      <img :src="image.url" alt="" class="rounded-lg object-cover object-center w-full h-full">
      <div @click="onDelete(index)" class="absolute top-0 right-0 m-1 p cursor-pointer rounded-full bg-black bg-opacity-75">
        x
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  emits: ['update:modelValue'],

  components: {
    draggable
  },

  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },

  watch: {
    value(newValue) {
      if (this.skipWatchIfDragged === false) {
        this.images = newValue;
      } else {
        this.skipWatchIfDragged = false;
      }
    }
  },

  data() {
    return {
      images: [...this.modelValue],
      skipWatchIfDragged: false,
    }
  },

  methods: {
    onDragEnd() {
      this.skipWatchIfDragged = true;
      this.$emit('update:modelValue', this.modelValue);
    },
    onDelete(index) {
      this.modelValue.splice(index, 1);
      this.skipWatchIfDragged = true;
      this.$emit('update:modelValue', this.modelValue);
    },
  }
}
</script>
