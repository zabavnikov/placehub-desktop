import { defineNuxtPlugin, useCookie, useRouter } from '#app'
import { useJwt } from '~/plugins/jwt/store'

export default defineNuxtPlugin(() => {
  const jwt = useJwt()

  return {
    provide: {
      jwt
    }
  }
})