<template>
  <the-layout heading="Регистрация">
    <form @submit.prevent="onSubmit" autocomplete="off" class="space-y-4">
      <div :class="{'is-invalid': errors.has('email')}">
        <label for="email" class="label">Электронная почта: <span class="asterisk"></span></label>
        <input v-model="form.email" @input="errors.clear('email')" class="input" type="email" id="email" maxlength="50">
        <div v-show="errors.has('email')" class="help mt-1">{{ errors.first('email') }}</div>
      </div>

      <div :class="{'is-invalid': errors.has('name')}">
        <label for="name" class="label">Имя пользователя: <span class="asterisk"></span></label>
        <input v-model="form.name" @input="errors.clear('name')" class="input" type="text" id="name" maxlength="25" placeholder="Разрешены цифры и символы латинского алфавита">
        <div v-if="errors.has('name')" class="help mt-1">{{ errors.first('name') }}</div>
      </div>

      <div :class="{'is-invalid': errors.has('password')}">
        <label for="password" class="label">Придумайте пароль: <span class="asterisk"></span></label>
        <input v-model="form.password" @input="errors.clear('password')" class="input" type="password" id="password" placeholder="Не менее 6 символов">
        <div v-if="errors.has('password')" class="help mt-1">{{ errors.first('password') }}</div>
      </div>

      <div>
        <label for="password-confirmation" class="label">Повторие пароль: <span class="asterisk"></span></label>
        <input v-model="form.passwordConfirmation" class="input" type="password" id="password-confirmation">
      </div>

      <div>
        Регистрируясь, вы соглашаетесь с <nuxt-link to="/terms" class="underline">правилами пользования сайтом</nuxt-link> и даете согласие на <nuxt-link class="underline" to="/privacy">обработку персональных данных</nuxt-link>.
      </div>

      <div class="mt-6">
        <button class="button button-success">Зарегистрироватся</button>
      </div>
    </form>
  </the-layout>
</template>

<script>
import Errors from '~/utils/validation';
import { REGISTER_USER } from '~/components/modules/users/graphql';
import { useGql } from '~/uses'

const formInitialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};


export default {
  middleware: 'auth',
  auth: 'guest',

  data() {
    return {
      form: {...formInitialState},
      errors: new Errors,
      loading: false,
    }
  },

  methods: {
    async onSubmit() {
      if (this.loading) {
        return
      }

      this.loading = true

      const mutation = `
        mutation(
          $name:                 String!,
          $email:                String!,
          $password:             String!,
          $passwordConfirmation: String!
        ) {
          ${REGISTER_USER}
        }
      `;

      const { registerUser } = await useGql(mutation, this.form)

      try {
        this.$auth.setUserToken(registerUser)

        this.form = {...formInitialState}

        this.$router.push({
          name: 'users.show',
          params: {
            userId: this.$auth.user.id
          }
        })
      } catch (errors) {
        this.errors.record(errors)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
