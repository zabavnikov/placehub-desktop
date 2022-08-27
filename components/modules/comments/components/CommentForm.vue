<template>
  <form @submit.prevent="onSubmit">
    <div>
      <v-textarea :autofocus="form.parent_id > 0" rows="1" :placeholder="form.parent_id > 0 ? 'Текст ответа' : 'Текст комментария'" v-model="form.text" />
    </div>
    <div class="flex items-center justify-end mt-2 space-x-2">
      <v-button variant="secondary" @click="$emit('cancel')">Отмена</v-button>
      <v-button type="submit" :loading="loading">Отправить</v-button>
    </div>
  </form>
</template>

<script>
import { useFetch, useNuxtApp } from 'nuxt/app'
import { ref } from 'vue'
import VTextarea from '~/components/library/VTextarea'
import VButton from '~/components/library/VButton'

export default {
  name: 'CommentForm',

  emits: ['added', 'cancel'],

  props: {
    modelType: {
      type: String,
      required: true,
    },
    modelId: {
      type: Number,
      required: true,
    },
    parentId: {
      type: Number,
    },
  },

  components: {
    VTextarea,
    VButton
  },

  setup({ modelType, modelId, parentId }, { emit }) {
    const loading = ref(false)

    const formInitialState = {
      model_type: modelType,
      model_id:   modelId,
      parent_id:  parentId,
      text:       '',
    }

    const form = ref({...formInitialState})

    const onSubmit = async () => {
      if (loading.value) {
        return
      }

      loading.value = true


      try {
        const { data, error } = await useFetch('http://localhost/api/comments', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: useNuxtApp().$auth.strategy.token.get()
          },
          body: form.value,
          initialCache: false,
        })

       if (! error.value) {
         await emit('added', data.value)
         Object.assign(form.value, formInitialState);
       }
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      onSubmit,
    }
  }
}
</script>