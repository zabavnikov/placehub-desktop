<template>
  <the-layout>
    <post :content="post" full />
    <hr>
    <comment-form model-type="posts" :model-id="post.id" />
    <comment-list :comments="comments"></comment-list>
  </the-layout>
</template>

<script>
import { useRoute } from '#app'
import { useAsyncGql } from '~/uses'
import { POST_FRAGMENT, POST_REPLY_FRAGMENT } from '../graphql'
import Post from '../components/Post'
import PostForm from '~/components/modules/posts/components/PostForm'
import CommentForm from '~/components/modules/comments/components/CommentForm';
import CommentList from '~/components/modules/comments/components/CommentList';

export default {
  components: {
    Post,
    PostForm,
    CommentForm,
    CommentList,
  },
  async setup() {
    const route = useRoute();

    const { data } = await useAsyncGql(`
      query ($id: Int!, $modelType: String) {
        post(id: $id) {
          ${POST_FRAGMENT}
        }
        comments(model_type: $modelType, model_id: $id) {
          ${POST_REPLY_FRAGMENT}
        }
      }
    `, {
      id: parseInt(route.params.postId),
      modelType: 'posts'
    })

    return {
      post: data.value.post,
      comments: data.value.comments
    }
  }
}
</script>