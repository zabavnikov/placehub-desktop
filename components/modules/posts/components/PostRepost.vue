<template>
  <div v-if="repost === null" class="p-2 rounded-lg bg-red-50 text-red-500 text-xs font-medium">Оригинальная запись была удалена</div>
  <div v-else class="space-y-4">
    <PostBody v-if="repost.text" :post="repost" />
    <PostGallery v-if="repost.images.length > 0" :images="repost.images"/>
  </div>
</template>

<script setup>
import PostBody    from './PostBody.vue'
import PostGallery from './PostGallery.vue'

const props = defineProps({
  repost: {
    type:     [Object, null],
    required: true
  }
})
</script>