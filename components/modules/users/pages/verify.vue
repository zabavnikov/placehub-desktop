<template>
  <the-layout>
    <div v-if="status === true" class="p-4 bg-green-300 rounded">
      Адрес электроной почты успешно подтвержден
    </div>
  </the-layout>
</template>
<script>
import { ref } from 'vue'
import {useNuxtApp, useRoute} from '#app/nuxt'

export default {
  data() {
    return {
      status: false
    }
  },

  async setup() {
    const { $axios } = useNuxtApp()
    const route = useRoute()
    const status = ref(false)

    try {
      await $axios
          .$get(`/api/users/verify/${route.params.userId}/${route.params.token}`, {
            params: {
              expires: route.query.expires,
              signature: route.query.signature,
            },
            headers: {
              Accept: 'application/json',
              Authorization: useNuxtApp().$auth.strategy.token.get()
            },
          })

      status.value = true;
    } catch (e) {
      console.log(e)
    }

    return {
      status
    }
  }
}
</script>
