<template>
  <TheLayout>
    <div class="space-y-6">
      <PostForm v-if="$auth.loggedIn" @created="data.posts.unshift($event)" class="mb-4"></PostForm>
      <Post v-for="post in data.posts" :key="post.id" :content="post" />
    </div>
  </TheLayout>
</template>

<script>
import { useAsyncGql } from '~/uses'
import { POST_CARD } from '~/components/modules/posts/graphql'
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
          ${POST_CARD}
        }
      }
    `)

    return {
      data
    }
  }
}
</script>