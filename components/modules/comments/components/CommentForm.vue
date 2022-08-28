<template>
  <form @submit.prevent="onSubmit">
    <div>
      <v-textarea :autofocus="form.parent_id > 0" rows="1" :placeholder="form.parent_id > 0 ? 'Текст ответа' : 'Текст комментария'" v-model="form.text" />
    </div>
    <div class="flex items-center justify-end mt-2 space-x-2">
      <v-button variant="secondary" @click="store.hideForm">Отмена</v-button>
      <v-button type="submit" :loading="loading">Отправить</v-button>
    </div>
  </form>
</template>

<script>
import { useFetch, useNuxtApp } from 'nuxt/app'
import { ref } from 'vue'
import VTextarea from '~/components/library/VTextarea'
import VButton from '~/components/library/VButton'
import { useCommentsStore } from '../stores/comments'

export default {
  name: 'CommentForm',

  emits: ['created', 'updated'],

  components: {
    VTextarea,
    VButton
  },

  setup({ modelType, modelId, parentId }, { $pinia, emit }) {
    const loading = ref(false)

    const store = useCommentsStore($pinia)

    const form = store.form.reply

    const onSubmit = async () => {
      if (loading.value) {
        return
      }

      loading.value = true

      try {
        const { data, error } = await useFetch(`http://localhost/api/comments/${store.isEdit ? form.id : ''}`, {
          method: store.isEdit ? 'PUT' : 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: useNuxtApp().$auth.strategy.token.get()
          },
          body: form,
          initialCache: false,
        })

       if (! error.value) {
         if (store.isEdit) {
           emit('updated', form)
         } else {
           emit('created', data.value)
         }
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
      store
    }
  }
}
</script>