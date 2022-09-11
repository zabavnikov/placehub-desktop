<template>
  <TheLayout>
    <template #sidebar>1</template>
    <div class="space-y-6">
      <Post v-for="post in data.posts" :key="post.id" :content="post" />
    </div>
  </TheLayout>
</template>

<script>
import { useAsyncGql } from '~/uses'
import { POST_CARD_FRAGMENT } from '~/components/modules/posts/graphql'
import Post from '~/components/modules/posts/components/Post'
import PostForm from '~/components/modules/posts/components/PostForm'
import TheLayout from '../components/layout/TheLayout';

export default {
  components: {
    TheLayout,
    Post,
    PostForm
  },

  async setup() {
    const { data } = await useAsyncGql(`
      query {
        posts {
          ${POST_CARD_FRAGMENT}
        }
      }
    `)

    return {
      data
    }
  }
}
</script>