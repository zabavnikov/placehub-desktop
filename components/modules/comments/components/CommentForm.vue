<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="form.text" class="bg-emerald-300">
    <button>Отправить</button>
  </form>
</template>

<script>
import { useFetch, useNuxtApp } from 'nuxt/app'
import { useCommentsStore } from '../stores/comments'

export default {
  name: 'CommentForm',

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
      onSubmit
    }
  }
}
</script>