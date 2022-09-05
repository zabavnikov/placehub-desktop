<template>
  <form @submit.prevent="onSubmit">
    <div>
      <v-textarea :autofocus="form.parent_id > 0" rows="1" :placeholder="form.parent_id > 0 ? 'Текст ответа' : 'Текст комментария'" v-model="form.text" />
    </div>
    <div class="flex items-center justify-end mt-2 space-x-2">
      <v-button variant="secondary" @click="onCancel">Отмена</v-button>
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
import pick from 'lodash.pick'

export default {
  name: 'CommentForm',

  emits: ['created', 'updated'],

  props: {
    comment: {
      type: Object
    },
    parentId: {
      type: Number,
    }
  },

  components: {
    VTextarea,
    VButton
  },

  setup({ comment, parentId }, { $pinia, emit }) {
    const loading = ref(false)

    const store = useCommentsStore($pinia)
    const isEdit = comment?.id > 0

    const formInitialState = {
      id:         null,
      parent_id:  parentId,
      model_type: store.model_type,
      model_id:   store.model_id,
      text:       '',
    }

    const form = ref({...formInitialState})

    if (comment) {
      Object.assign(form.value, pick(comment, Object.keys(formInitialState)))
    }

    const onCancel = () => {
      store.activeForm = null;
      form.value = {...formInitialState}
    }

    const onSubmit = async () => {
      if (loading.value) {
        return
      }

      loading.value = true

      try {
        const { data, error } = await useFetch(`http://localhost/api/comments/${isEdit ? comment.id : ''}`, {
          method: isEdit ? 'PUT' : 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: useNuxtApp().$auth.strategy.token.get()
          },
          body: form.value,
          initialCache: false,
        })

       if (! error.value) {
         form.value = {...formInitialState}

         if (isEdit) {
           emit('updated', form.value)
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
      onCancel,
      store
    }
  }
}
</script>