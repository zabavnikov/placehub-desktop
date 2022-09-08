import { defineNuxtPlugin } from 'nuxt/app'
import TheLayout from '~/components/layout/TheLayout'
import { Ripple } from '@placehub/ui'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('TheLayout', TheLayout)
  nuxtApp.vueApp.directive('ripple', Ripple)
})