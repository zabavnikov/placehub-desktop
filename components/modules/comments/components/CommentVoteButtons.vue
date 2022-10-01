<template>
  <div class="flex items-center space-x-2">
    <div :title="`За ${votesUpCount}`">
      <ChevronUpIcon @click="onVote('up')" :class="{'text-green': typeR==='up'}" class="w-5 h-5 text-gray-800 cursor-pointer" />
    </div>
    <div class="text-xs font-medium">{{ count }}</div>
    <div :title="`Против ${votesDownCount}`">
      <ChevronDownIcon @click="onVote('down')" :class="{'text-red': typeR==='down'}" class="w-5 h-5 text-gray-800 cursor-pointer" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
import { useGql } from '~/uses'

const { modelId, rating, vote } = defineProps({
  modelId: {
    type:     Number,
    required: true,
  },
  rating: {
    type:     Number,
    required: true,
  },
  vote: {
    type: Object,
    required: true
  },
  votesUpCount: {
    type: Number,
    default: 0,
  },
  votesDownCount: {
    type: Number,
    default: 0,
  }
})

const count = ref(rating)
const typeR = ref(vote?.type)

const onVote = async (type) => {
  const { data: { commentVote }, error } = await useGql(`
    mutation($model_id: Int!, $type: String!) {
      commentVote(model_id: $model_id, type: $type)
    }
  `, {
    model_id: modelId,
    type
  })


  const [countNew, typeNew] = commentVote

  count.value = countNew
  typeR.value = typeNew

}
</script>