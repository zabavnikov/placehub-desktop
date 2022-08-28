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

  components: {
    VTextarea,
    VButton
  },

  setup({ modelType, modelId, parentId }, { $pinia }) {
    const loading = ref(false)

    const store = useCommentsStore($pinia)

    const formInitialState = {
      ...store.form,
      text: '',
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
         await store.addComment(data.value, data.value.branch_id)
         Object.assign(form.value, formInitialState)
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