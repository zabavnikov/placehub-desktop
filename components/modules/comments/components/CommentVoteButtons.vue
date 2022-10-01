<template>
  <div class="flex items-center space-x-2">
    <HandThumbUpIcon @click="onVote('up')" class="w-4 h-4 text-gray-800 cursor-pointer" />
    <div class="text-xs font-medium">{{ count }}</div>
    <HandThumbDownIcon @click="onVote('down')" class="w-4 h-4 text-gray-800 cursor-pointer" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/vue/24/outline'
import { useGql } from '~/uses'

const { modelId, rating } = defineProps({
  modelId: {
    type:     Number,
    required: true,
  },
  rating: {
    type:     Number,
    required: true,
  }
})

const count = ref(rating)

const onVote = async (type) => {
  const { data: { commentVote }, error } = await useGql(`
    mutation($model_id: Int!, $type: String!) {
      commentVote(model_id: $model_id, type: $type)
    }
  `, {
    model_id: modelId,
    type
  })


  count.value = commentVote
}
</script>