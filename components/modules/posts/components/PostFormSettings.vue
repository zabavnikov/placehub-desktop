<template>
  <Dropdown>
    <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">
      <Settings2 class="w-5 h-5" />
    </button>
    <template v-slot:popper="{ hide }">
      <FormField name="comments" label="Кто может писать комментарии?">
        <div
            v-for="(name, key) in commentAccess"
            :key="key"
            class="rounded-lg px-2 py-1 cursor-pointer"
            :class="{'bg-indigo-50': selectedCommentAccess === key}"
            @click="selectedCommentAccess = key; $emit('update:who-can-comment', key)"
        >{{ name }}</div>
      </FormField>
    </template>
  </Dropdown>
</template>

<script setup>
import { Dropdown, FormField } from '@placehub/ui'
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