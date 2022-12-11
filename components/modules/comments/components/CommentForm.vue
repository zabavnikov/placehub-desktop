<template>
  <form @submit.prevent="onSubmit">
    <FormField name="input.text">
      <Textarea :autofocus="form.parent_id > 0" rows="1"
                :placeholder="form.parent_id > 0 ? 'Текст ответа' : 'Текст комментария'" v-model="form.text"/>
    </FormField>
    <div class="flex items-center justify-end mt-2 space-x-2">
      <Button variant="secondary" @click="onCancel">Отмена</Button>
      <Button type="submit" :loading="loading">Отправить</Button>
    </div>
  </form>
</template>

<script>
import pick from 'lodash.pick'
import { CREATE_COMMENT, UPDATE_COMMENT } from '../graphql'
import { FormField, Textarea, Button } from '@placehub/ui'
import { ref } from 'vue'
import { useCommentsStore } from '../store.ts'
import { useFetch } from '#imports'
import { useForm } from 'vee-validate'

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
    Textarea,
    Button,
    FormField
  },

  setup({ comment, parentId }, {$pinia, emit}) {
    const loading = ref(false)

    const store = useCommentsStore($pinia)
    const isEdit = comment?.id > 0

    const formInitialState = {
      id: null,
      parent_id: parentId,
      post_id: store.post_id,
      text: '',
    }

    const form = ref({...formInitialState})

    if (comment) {
      Object.assign(form.value, pick(comment, Object.keys(formInitialState)))
    }

    const onCancel = () => {
      store.activeForm = null;
      form.value = {...formInitialState}
    }

    const { handleSubmit, setErrors } = useForm()

    const onSubmit = handleSubmit(async () => {
      if (loading.value) {
        return
      }

      loading.value = true

      try {
        const input = pick(form.value, ['parent_id', 'post_id',  'text'])

        const { data: { commentData }} = await useFetch({
          query: isEdit ? UPDATE_COMMENT : CREATE_COMMENT,
          variables: {
            id: comment?.id,
            input
          }
        })

        if (isEdit) {
          emit('updated', commentData)
        } else {
          emit('created', commentData)
        }

        form.value = {...formInitialState}
      } catch (error) {
        if (error.message === 'validation') {
          setErrors(error.extensions.validation)
        }
      } finally {
        loading.value = false
      }
    })

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