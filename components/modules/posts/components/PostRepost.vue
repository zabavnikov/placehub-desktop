<template>
  <div class="space-y-4">
    <PostBody v-if="repost.text" :post="repost" />
    <PostGallery v-if="repost.images.length > 0" :images="repost.images"/>
  </div>
</template>

<script setup>
import PostBody    from './PostBody.vue'
import PostGallery from './PostGallery.vue'

const props = defineProps({
  repost: {
    type:     Object,
    required: true
  }
})
</script>