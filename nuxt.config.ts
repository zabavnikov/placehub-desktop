import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs-alt/auth',
    '@nuxtjs-alt/axios',
    '@pinia/nuxt',
    '~/modules/routes'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.API_URL + '/api/users/login',
            method: 'post',
          },
          logout: {
            url: process.env.API_URL + '/api/users/logout',
            method: 'post'
          },
          user: {
            url: process.env.API_URL + '/api/users/me',
            method: 'post',
            propertyName: false
          }
        },
        token: {
          property: 'token',
          maxAge: 60 * 60
        },
        user: {
          property: false,
        },
      }
    },
    redirect: {
      home: false,
    }
  },
})
