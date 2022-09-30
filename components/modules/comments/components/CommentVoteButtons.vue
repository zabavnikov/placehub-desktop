<template>
  <div class="flex items-center space-x-2">
    <HandThumbUpIcon @click="onVote('up')" class="w-4 h-4 text-gray-800 cursor-pointer" />
    <div class="text-xs font-medium">{{ votesCount }}</div>
    <HandThumbDownIcon @click="onVote('down')" class="w-4 h-4 text-gray-800 cursor-pointer" />
  </div>
</template>

<script setup>
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/vue/24/outline'
import { useGql } from '~/uses'

const { modelId } = defineProps({
  modelId: {
    type:     Number,
    required: true,
  },
  votesCount: {
    type:     Number,
    required: true,
  }
})

const onVote = async (type) => {
  const { data: { commentVote }, error } = await useGql(`
    mutation($model_id: Int!, $type: String!) {
      commentVote(model_id: $model_id, type: $type)
    }
  `, {
    model_id: modelId,
    type
  })
}
</script>