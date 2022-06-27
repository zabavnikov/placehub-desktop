<template>
  <TheLayout>
    <div class="posts">
      <post-form></post-form>
      <post v-for="post in data.posts" :key="post.id" :content="post" />
    </div>
  </TheLayout>
</template>

<script>
import { useAsyncGql } from '~/uses'
import { POST_CARD_FRAGMENT } from '../graphql'
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
          ${POST_CARD_FRAGMENT}
        }
      }
    `)

    return {
      data,
    }
  }
}
</script>

<style>
.posts .post + .post {
  border-top: 1px solid #f1f1f1;
}
</style>