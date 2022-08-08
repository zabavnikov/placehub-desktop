<template>
  <div>{{ comment.text }}</div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    }
  }
}
</script>