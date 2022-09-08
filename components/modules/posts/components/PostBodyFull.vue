<template>
  <div>
    <div class="whitespace-pre-line leading-relaxed">{{ post.text }}</div>
  </div>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>