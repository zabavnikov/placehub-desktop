<template>
  <form @submit.prevent="onSubmit">
    <div>
      <v-textarea :autofocus="form.parent_id > 0" rows="1" :placeholder="form.parent_id > 0 ? 'Текст ответа' : 'Текст комментария'" v-model="form.text" />
    </div>
    <div class="flex items-center">
      <button type="button" @click="form.parent_id = null">Отмена</button>
      <button>Отправить</button>
    </div>
  </form>
</template>

<script>
import { useFetch, useNuxtApp } from 'nuxt/app'
import { useCommentsStore } from '../stores/comments'
import VTextarea from '~/components/form/VTextarea'

export default {
  name: 'CommentForm',

  components: {
    VTextarea
  },

  setup(props, { $pinia }) {
    const comments = useCommentsStore($pinia)

    const onSubmit = () => {
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
      }
    }

    return {
      form: comments.form,
      onSubmit,
    }
  }
}
</script>