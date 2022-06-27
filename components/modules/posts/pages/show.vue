<template>
  <TheLayout>
    <Post :content="post" full />
    <hr>
    <div class="p-6">
      <div>
        {{ replies }}
      </div>
    </div>
  </TheLayout>
</template>

<script>
import { useRoute } from '#app'
import { useAsyncGql } from '~/uses'
import { POST_FRAGMENT, POST_REPLY_FRAGMENT } from '../graphql.ts'
import Post from '../components/Post.vue'

export default {
  components: {
    Post
  },
  async setup() {
    const route = useRoute();

    const { data, error } = await useAsyncGql(`
      query ($id: Int!) {
        post(id: $id) {
          ${POST_FRAGMENT}
        }
        postReplies(postId: $id) {
          ${POST_REPLY_FRAGMENT}
        }
      }
    `, {
      id: parseInt(route.params.postId)
    })

    return {
      post: data.value.post,
      replies: data.value.postReplies
    }
  }
}
</script>