<template>
  <TheLayout>
    <template #sidebar>12</template>
    <div class="space-y-6">
      <post v-for="post in data.posts" :key="post.id" :content="post" />
    </div>
  </TheLayout>
</template>

<script>
import { useAsyncGql } from '~/uses'
import { POST_CARD } from '../graphql'
import Post from '~/components/modules/posts/components/Post'
import PostForm from '~/components/modules/posts/components/PostForm'

export default {
  components: {
    Post,
    PostForm
  },

  async setup() {
    const { data, pending, error } = await useAsyncGql(`
      query {
        posts {
          ${POST_CARD}
        }
      }
    `)

    return {
      data,
    }
  }
}
</script>