<template>
  <the-layout>
    <post :content="post" full />
    <hr>
    <comment-list :comments="comments" model-type="posts" :model-id="post.id" />
  </the-layout>
</template>

<script>
import { useRoute } from '#app'
import { useAsyncGql } from '~/uses'
import { POST_FRAGMENT, POST_REPLY_FRAGMENT } from '../graphql'
import Post from '../components/Post'
import PostForm from '~/components/modules/posts/components/PostForm'
import { useCommentsStore } from '~/components/modules/comments/stores/comments'
import CommentList from '~/components/modules/comments/components/CommentList';
import { COMMENT } from '../../comments/graphql';

export default {
  components: {
    Post,
    PostForm,
    CommentList,
  },
  async setup(_, { $pinia }) {
    const route = useRoute()
    const commentsStore = useCommentsStore($pinia)

    commentsStore.$patch(state => {
      state.form.model_type = 'posts'
      state.form.model_id   = parseInt(route.params.postId)
    })

    const { data } = await useAsyncGql(`
      query ($id: Int!, $modelType: String) {
        post(id: $id) {
          ${POST_FRAGMENT}
        }
        comments(model_type: $modelType, model_id: $id) {
          ${COMMENT}
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