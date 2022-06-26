<template>
  <div class="whitespace-pre-line">{{ post.text }}</div>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>