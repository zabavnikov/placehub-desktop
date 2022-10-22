<template>
  <TheLayout>
    <post :content="post" full class="mb-6" />
    <comment-list id="comments" model-type="posts" :count="post.comments_count" :model-id="post.id" />
  </TheLayout>
</template>

<script>
import { useRoute } from '#app'
import { useAsyncGql } from '~/uses'
import { POST_FRAGMENT  } from '../graphql'
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

    try {
      const { data } = await useAsyncGql(`
        query ($id: Int!, $modelType: String, $withTrashed: Boolean) {
          post(id: $id) {
            ${POST_FRAGMENT}
          }
          comments(model_type: $modelType, model_id: $id, with_trashed: $withTrashed) {
            ${COMMENT}
          }
        }
      `, {
        id: parseInt(route.params.postId),
        modelType: 'posts',
        withTrashed: true
      })

      commentsStore.$patch(state => {
        state.model_type  = 'posts'
        state.model_id    = parseInt(route.params.postId)
        state.list        = data.value.comments
      })

      return {
        post: data.value.post,
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>