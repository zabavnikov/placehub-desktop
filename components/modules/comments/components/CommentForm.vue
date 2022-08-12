<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="form.text" class="bg-emerald-300">
    <button>Отправить</button>
  </form>
</template>

<script>
import { reactive } from 'vue'
import { useFetch, useNuxtApp } from 'nuxt/app'

export default {
  name: 'CommentForm',

  props: {
    modelType: {
      type: String,
      required: true,
    },
    modelId: {
      type: Number,
      required: true,
    },
    parentId: Number,
  },

  setup(props) {
    const form = reactive({
      text: '',
    })

    const onSubmit = () => {
      try {
        useFetch('http://localhost/api/comments', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: useNuxtApp().$auth.strategy.token.get()
          },
          body: {
            ...form,
            model_type: props.modelType,
            model_id: props.modelId,
            parent_id: props.parentId,
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    return {
      form,
      onSubmit
    }
  }
}
</script>