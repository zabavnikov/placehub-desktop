<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="form.text" class="bg-emerald-300">
{{ form.text }}
    <button>Отправить</button>
  </form>
</template>

<script>
import { reactive } from 'vue'
import { useFetch, useNuxtApp } from 'nuxt/app'

export default {
  setup() {
    const form = reactive({
      text: ''
    })

    const onSubmit = () => {
      return useFetch('http://localhost/api/comments', {
        method: 'POST',
        headers: {
          Authorization: useNuxtApp().$auth.strategy.token.get()
        }
      })
    }

    return {
      form,
      onSubmit
    }
  }
}
</script>