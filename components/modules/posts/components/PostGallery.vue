<template>
  <div>
    {{ images }}
  </div>
</template>

<script lang="ts">
export default {
  props: {
    images: {
      type: Array,
      required: true,
    }
  },
}
</script>