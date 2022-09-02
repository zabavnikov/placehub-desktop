import { defineNuxtPlugin } from 'nuxt/app'
import TheLayout from '~/components/layout/TheLayout'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('TheLayout', TheLayout)
})