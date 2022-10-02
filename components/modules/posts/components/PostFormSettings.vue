<template>
  <Dropdown>
    <button type="button" class="rounded-full p-2 border border-indigo-200">
      <Cog6ToothIcon class="w-5 h-5 text-indigo-500" />
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
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
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