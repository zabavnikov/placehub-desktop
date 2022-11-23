import { defineNuxtPlugin } from 'nuxt/app'
import TheLayout from '~/components/layout/TheLayout'
import { Ripple, OverlayPlugin, } from '@placehub/ui'
import AxiosPlugin from '../../ui/src/axios.js'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('TheLayout', TheLayout)
  nuxtApp.vueApp.directive('ripple', Ripple)
  nuxtApp.vueApp.use(OverlayPlugin)

  nuxtApp.vueApp.use(AxiosPlugin, {
    baseUrl: 'http://127.0.0.1:8080/graphql',
    token: nuxtApp.$auth.strategy.token.get()
  })

  return {
    provide: {
      overlay: nuxtApp.vueApp.config.globalProperties.$overlay
    }
  }
})
