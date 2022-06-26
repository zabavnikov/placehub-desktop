<template>
  <TheLayout>
    <div class="posts">
      <Post v-for="post in data.posts" :key="post.id" :content="post" />
    </div>
  </TheLayout>
</template>

<script>
import { useGql } from '~/uses'
import { POST_CARD_FRAGMENT } from '~/components/modules/posts/components/graphql'
import Post from '~/components/modules/posts/components/Post.vue'

export default {
  components: {
    Post
  },

  async setup() {
    const { data, pending, error } = await useGql(`
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