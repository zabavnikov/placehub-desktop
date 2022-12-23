<template>
  <TheLayout heading="Редактирование профиля">
    <form @submit.prevent="onSubmit">
      <fieldset class="space-y-4">
        <FormField label="Имя" name="input.name" required>
          <template v-slot="{ hasError }">
            <Input v-model="user.name" type="text" id="input.name" />
          </template>
          <template #help>
            Чтобы людям было проще находить ваш аккаунт, используйте имя, под которым вас знают: ваше имя и фамилию, никнейм или название компании.
          </template>
        </FormField>

        <FormField label="О себе" name="input.description">
          <Textarea v-model="user.description" id="description" />
        </FormField>
      </fieldset>

      <div class="my-6 bg-indigo-50 h-px" />

      <Button type="submit" :loading="loading">Сохранить</Button>
    </form>
  </TheLayout>
</template>

<script setup>
import { Textarea, Input, FormField } from '@placehub/ui'
import { UPDATE_USER } from '../graphql'
import { USER_FORM_FIELD } from '~/components/modules/users/graphql'
import { useFetch } from '#imports'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useRoute } from 'nuxt/app'

const route = useRoute()
const loading = ref(false)
const user = ref({})
const userId = parseInt(route.params.userId)

const { data } = await useFetch({
  query: `
    query($userId: Int!) {
      user(id: $userId) {
        ${USER_FORM_FIELD}
      }
    }
  `,
  variables: {
    userId
  }
})

user.value = data.user

const { handleSubmit, setErrors } = useForm()

// Отправка формы
const onSubmit = handleSubmit(async () => {
  if (loading.value) {
    return
  }

  loading.value = true

  const input = user.value

  delete input.id
  delete input.__typename

  try {
    await useFetch({
      query: `
        ${UPDATE_USER}
      `,
      variables: {
        id: userId,
        input
      }
    })
  } catch (error) {
    if (error.message === 'validation') {
      setErrors(error.extensions.validation);
    }
  } finally {
    loading.value = false
  }
})
</script>

