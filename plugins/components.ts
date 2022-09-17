import { defineNuxtPlugin } from 'nuxt/app'
import TheLayout from '~/components/layout/TheLayout'
import { Ripple, OverlayPlugin } from '@placehub/ui'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('TheLayout', TheLayout)
  nuxtApp.vueApp.directive('ripple', Ripple)
  nuxtApp.vueApp.use(OverlayPlugin)

  return {
    provide: {
      overlay: nuxtApp.vueApp.config.globalProperties.$overlay
    }
  }
})
