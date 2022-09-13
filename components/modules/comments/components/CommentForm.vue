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
import {useFetch, useNuxtApp} from 'nuxt/app'
import {ref} from 'vue'
import {FormField, Textarea, Button} from '@placehub/ui'
import {useCommentsStore} from '../stores/comments'
import pick from 'lodash.pick'
import {useForm} from 'vee-validate'
import {useGql} from '~/uses'
import {CREATE_COMMENT, UPDATE_COMMENT} from '../graphql';

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
      model_type: store.model_type,
      model_id: store.model_id,
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

    const { handleSubmit } = useForm()

    const onSubmit = handleSubmit(async (values, actions) => {
      if (loading.value) {
        return
      }

      loading.value = true

      try {
        const input = pick(form.value, ['parent_id', 'model_type', 'model_id', 'text'])

        const mu = isEdit ? UPDATE_COMMENT : CREATE_COMMENT;

        const { data: { commentData }, error } = await useGql(mu, {
          id: comment.id,
          input
        })

        if (! error) {
          if (isEdit) {
            emit('updated', commentData)
          } else {
            emit('created', commentData)
          }

          form.value = {...formInitialState}
        }
      } catch (error) {
        if (error[0]) {
          actions.setErrors(error[0]['extensions']['validation']);
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