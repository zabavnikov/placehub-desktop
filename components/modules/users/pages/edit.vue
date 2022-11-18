<template>
  <TheLayout reverse heading="Редактирование профиля">
    <template #sidebar>
      <img :src="$auth.user.avatar" :alt="user.name" class="rounded" width="100%" />
      <input type="file" @change="onUpload" class="mt-2" />
    </template>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <FormField label="Имя" name="input.name" required>
        <template v-slot="{ hasError }">
          <Input v-model="user.name" type="text" id="input.name" :variant="hasError ? 'error' : undefined" />
        </template>
        <template #help>
          Чтобы людям было проще находить ваш аккаунт, используйте имя, под которым вас знают: ваше имя и фамилию, никнейм или название компании.
        </template>
      </FormField>

      <FormField label="О себе" name="input.description">
        <Textarea v-model="user.description" id="description" />
      </FormField>

      <Button type="submit" :loading="loading">Сохранить</Button>
    </form>
  </TheLayout>
</template>

<script setup>
import { Textarea, Input, Button, FormField } from '@placehub/ui'
import { UPDATE_USER } from '../graphql'
import { USER } from '~/components/modules/users/graphql'
import { gql, useAsyncQuery, useMutation } from '#imports'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useRoute } from 'nuxt/app'

const route = useRoute()
const loading = ref(false)
const user = ref({})
const userId = parseInt(route.params.userId)

const { data } = await useAsyncQuery(gql`
  query($userId: Int!) {
    ${USER}
  }
`, {
  userId
})

user.value = data.value.user

// Отправка формы
const onSubmit = useForm().handleSubmit(async (values, actions) => {
  if (loading.value) {
    return
  }

  loading.value = true

  const input = user.value

  delete input.id
  delete input.__typename
  delete input.avatar

  try {
    const { mutate } = await useMutation(gql`
      ${UPDATE_USER}
    `, {
      variables: {
        id: userId,
        input
      }
    })

    await mutate()
  } catch (error) {
    if (error.graphQLErrors) {
      actions.setErrors(error.graphQLErrors[0]['extensions']['validation']);
    }
  } finally {
    loading.value = false
  }
})

const onUpload = () => {}
</script>

<!--
<script>

export default {

  methods: {
    onSubmit() {
      if (this.loading) {
        return;
      }

      this.loading = true;

      this.$axios
          .$put(`/api/users/${this.$auth.user.id}`, this.user)
          .then((response) => {
            if (response.status === true) {
              if (this.user.name !== this.$auth.user.name) {
                this.$store.commit('UPDATE_USER', {name: this.user.name})
              }

              this.$router.push({
                name: 'users.show',
                params: { userId: this.$auth.user.id },
              });
            }
          })
          .catch((error) => this.errors.record(error))
          .finally(() => (this.loading = false));
    },

    onUpload(event) {
      const formData = new FormData();

      formData.append("image", event.target.files[0]);

      this.$axios
          .$post('/api/users/upload/avatar', formData)
          .then(avatar => {
            if (avatar !== null) {
              this.$store.commit('UPDATE_USER', {avatar});
            }
          })
          .finally(() => {
            event.target.value = "";
          });
    },
  },
};
</script>
-->

