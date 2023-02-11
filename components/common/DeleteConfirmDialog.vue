<template>
  <div tabindex="-1" aria-hidden="true" class="absolute left-0 top-0 w-full h-full overflow-y-auto">
    <div class="flex items-center justify-center flex-col p-10 min-h-full">
      <div class="relative w-[320px] max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <header class="p-4 flex justify-between items-center p-4 rounded-t border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 leading-none">
            {{ title }}
          </h3>
          <button @click="onClose" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="defaultModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Закрыть</span>
          </button>
        </header>

        <div class="p-4 text-center">
          <p v-if="pendingDeletion" class="mb-4">
            Комментарий будет удален через <span class="text-red">{{ 5 - seconds }}</span>. <span class="underline cursor-pointer" @click="onCancel">Нажмите отмена</span>, чтобы отменить удаление.
          </p>
          <p v-else class="mb-4">{{ text }}</p>
          <Button :loading="pendingDeletion" variant="danger" class="w-full" @click="onDelete">Удалить</Button>
          <Button variant="secondary" class="w-full mt-1" @click="onClose">Отмена</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Button } from '@placehub/ui'
import { useFetch } from '#imports'
import { ref } from 'vue'
import { useNuxtApp } from '#app/nuxt'

const emit = defineEmits(['deleted'])

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  mutation: {
    type: String,
    required: true,
  },
  mutationName: {
    type: String,
    required: true,
  },
  variables: {
    type: Object
  }
})

let timeout;
let interval;
const seconds = ref(0);
const pendingDeletion = ref(false)
const { $overlay } = useNuxtApp()

const onCancel = () => {
  clearTimeout(timeout)
  clearInterval(interval)
  seconds.value = 0
  pendingDeletion.value = false
}

const onClose = () => {
  if (pendingDeletion.value === false) {
    $overlay.hide()
  }
  onCancel()
}

const onDelete = async () => {
  if (pendingDeletion.value) {
    return
  }

  pendingDeletion.value = true

  interval = setInterval(() => seconds.value++, 1000)
  timeout = setTimeout(async () => {
    try {
      const { data } = await useFetch({
        query:     props.mutation,
        variables: props.variables,
      })

      if (data[props.mutationName]) {
        emit('deleted')
      }

    } catch (error) {}
    finally {
      onCancel()
    }
  }, 5000)
}
</script>