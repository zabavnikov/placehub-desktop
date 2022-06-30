<template>
  <the-layout>
    <post :content="post" full />
    <hr>
    <div class="posts">
      <post-form />
      <post-reply v-for="reply in replies" :key="reply.id" :content="reply" />
    </div>
  </the-layout>
</template>

<script>
import { useRoute } from '#app'
import { useAsyncGql } from '~/uses'
import { POST_FRAGMENT, POST_REPLY_FRAGMENT } from '../graphql'
import Post from '../components/Post'
import PostForm from '~/components/modules/posts/components/PostForm'
import PostReply from '../components/PostReply'

export default {
  components: {
    Post,
    PostForm,
    PostReply
  },
  async setup() {
    const route = useRoute();

    const { data } = await useAsyncGql(`
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