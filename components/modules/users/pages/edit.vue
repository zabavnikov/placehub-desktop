<template>
  <the-layout reverse heading="Редактирование профиля">
    <template #sidebar>
      <img :src="$auth.user.avatar" :alt="user.name" class="rounded" width="100%" />
      <input type="file" @change="onUpload" class="mt-2" />
    </template>

      <div>
        <label for="name">
          Имя пользователя
          <span class="asterisk"></span>
        </label>

        <Input v-model="user.name" type="text" id="name" />
        <div v-if="errors.has('name')" class="help mt-1" style="color: red;">{{ errors.first('name') }}</div>
        <div
            v-else
            class="text-xs font-semibold text-gray-800 mt-1"
        >Чтобы людям было проще находить ваш аккаунт, используйте имя, под которым вас знают: ваше имя и фамилию, никнейм или название компании.</div>
      </div>

      <div class="mt-4">
        <label for="description">О себе</label>
        <Textarea v-model="user.description" id="description" />
        <div v-if="errors.has('description')" class="help mt-1" style="color: red;">{{ errors.first('description') }}</div>
      </div>

      <div class="mt-4">
        <Button @click="onSubmit" :class="{loading}" class="button button-success">Сохранить</Button>
      </div>
  </the-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from '#app'
import { Textarea, Input } from '@placehub/ui';
import Errors from '~/utils/validation'
import { USER } from '~/components/modules/users/graphql'
import { useAsyncGql } from '~/uses'

const route = useRoute()
const errors = new Errors
const loading = ref(false)

const { data } = await useAsyncGql(`
  query($userId: ID!) {
    ${USER}
  }
`, {
  userId: route.params.userId
})

const user = data.value.user;
</script>

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

