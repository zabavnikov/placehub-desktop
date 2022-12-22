<template>
  <TheLayout>
    <div v-if="attemptToConfirmMail" class="p-4 mb-4 bg-red-300">
      Для подтверждения адреса электронной почты,
      войдите в свой профиль, используя адреса электронной почты и пароль указнные при регистрации.
    </div>

    <form @submit.prevent="onSubmit" autocomplete="off" :class="{loading}" class="space-y-4">
      <div class="mb-2 bg-red-300 p-4 ronded" v-if="isBanned">
        Пользователь заблокирован
      </div>

      <FormField name="email" label="Электронная почта" required>
        <Input v-model="form.email" type="email" id="email" />
      </FormField>
      <FormField name="password" label="Пароль" required>
        <Input v-model="form.password" type="password" id="password" />
      </FormField>

      <div class="mt-4">
        Авторизуясь, вы соглашаетесь с <nuxt-link to="/terms" class="underline">правилами пользования сайтом</nuxt-link> и даете согласие на <nuxt-link class="underline" to="/privacy">обработку персональных данных</nuxt-link>.
      </div>

      <div class="mt-4">
        <Button type="submit">Войти</Button>
      </div>
    </form>
  </TheLayout>
</template>

<script setup>
import {
  FormField,
  Input,
} from '@placehub/ui'

definePageMeta({
  auth: 'guest',
})
</script>

<script>
import Validation from '~/utils/validation';

const formInitialState = {
  email: '',
  password: '',
};

export default {
  data() {
    return {
      form: {...formInitialState},
      loading: false,
      isBanned: false,
      errors: new Validation,
    }
  },

  methods: {
    onSubmit() {
      if (this.loading) {
        return;
      }

      this.loading = true;

      this.$auth.loginWith('local', {body: this.form})
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => this.loading = false);
    }
  },

  computed: {
    /**
     * Если пользователь не авторизованный прошел по ссылки подтверждения пароля.
     * @returns {boolean|boolean}
     */
    attemptToConfirmMail() {
      return this.$route.query.hasOwnProperty('expires')
          && this.$route.query.hasOwnProperty('signature');
    }
  }
}
</script>
