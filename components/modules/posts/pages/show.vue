<template>
  <TheLayout>
    {{ data.post }}
  </TheLayout>
</template>

<script>
import { useRoute } from '#app'
import { useGql } from '~/uses'
import { POST_FRAGMENT } from '../graphql'

export default {
  async setup() {
    const route = useRoute();

    const { data, error } = await useGql(`
      query ($id: Int!) {
        post(id: $id) {
          ${POST_FRAGMENT}
        }
      }
    `, {
      id: parseInt(route.params.postId)
    })

    return {
      data
    }
  }
}
</script>