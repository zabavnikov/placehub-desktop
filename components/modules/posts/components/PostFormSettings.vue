<template>
  <Dropdown>
    <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">
      <Settings2 class="w-5 h-5" />
    </button>
    <template v-slot:popper="{ hide }">
      <h3 class="m-1 mb-2 font-semibold">Кто может писать комментарии?</h3>
      <div
          v-for="(name, key) in commentAccess"
          :key="key"
          class="rounded-lg p-2 cursor-pointer"
          :class="{'bg-indigo-50': selectedCommentAccess === key}"
          @click="selectedCommentAccess = key; $emit('update:who-can-comment', key)"
      >{{ name }}</div>
    </template>
  </Dropdown>
</template>

<script setup>
import { Settings2 } from 'lucide-vue-next'
import { ref } from 'vue'

defineEmits(['update:who-can-comment'])

const props = defineProps({
  whoCanComment: {
    type:    String,
    default: 'all',
  }
})

const commentAccess = {
  all:          'Все',
  subscribers:  'Только подписчики',
  nobody:       'Никто'
}

const selectedCommentAccess = ref(props.whoCanComment)
</script>