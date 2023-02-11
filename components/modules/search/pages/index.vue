<template>
  <TheLayout>
    <div v-if="search.length">
      <post v-for="(post, index) in search" @delete="search.splice(index, 1)" :key="post.id" :content="post" class="mb-6"></post>
    </div>
  </TheLayout>
</template>

<script>
import { useAsyncGql } from '~/uses'
import { SEARCH } from '../graphql'
import { useRoute } from '#app/nuxt';
import Post from '~/components/modules/posts/components/Post'

export default {
  components: {
    Post
  },

  async setup() {
    const route = useRoute()

    const { data: { value: { search } } } = await useAsyncGql(`
     query ($query: String!) {
        ${SEARCH}
     }
    `, {
      query: route.params.query
    })

    return {
      search
    }
  }
}
</script>