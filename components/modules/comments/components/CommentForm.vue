<template>
  <form @submit.prevent="onSubmit">
    <div>
      <v-textarea :autofocus="form.parent_id > 0" rows="1" :placeholder="form.parent_id > 0 ? 'Текст ответа' : 'Текст комментария'" v-model="form.text" />
    </div>
    <div class="flex items-center justify-end mt-2 space-x-2">
      <v-button variant="secondary" @click="form.parent_id = null">Отмена</v-button>
      <v-button type="submit" :loading="loading">Отправить</v-button>
    </div>
  </form>
</template>

<script>
import { useFetch, useNuxtApp } from 'nuxt/app'
import { useCommentsStore } from '../stores/comments'
import { ref } from 'vue'
import VTextarea from '~/components/library/VTextarea'
import VButton from '~/components/library/VButton'

export default {
  name: 'CommentForm',

  components: {
    VTextarea,
    VButton
  },

  setup(props, { $pinia }) {
    const comments = useCommentsStore($pinia)
    const loading = ref(false)

    const onSubmit = () => {
      if (loading.value) {
        return
      }

      loading.value = true

      try {
        useFetch('http://localhost/api/comments', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: useNuxtApp().$auth.strategy.token.get()
          },
          body: comments.form
        })
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    return {
      form: comments.form,
      loading,
      onSubmit,
    }
  }
}
</script>