<template>
  <TheLayout>
    <post :content="post" full class="mb-6" />

    <div v-if="post.who_can_comment === 'subscribers'">Комментарии доступны только подписчикам</div>
    <div v-if="post.who_can_comment === 'nobody'">Комментарии закрыты</div>
    <comment-list id="comments" :count="post.comments_count" :post-id="post.id" />
  </TheLayout>
</template>

<script>
import { useRoute } from '#app'
import { useAsyncGql } from '~/uses'
import { POST_FRAGMENT  } from '../graphql'
import Post from '../components/Post'
import PostForm from '~/components/modules/posts/components/PostForm'
import { useCommentsStore } from '~/components/modules/comments/store.ts'
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
      state.post_id = parseInt(route.params.postId)
    })

    try {
      const { data } = await useAsyncGql(`
        query ($id: Int!, $with_trashed: Boolean) {
          post(id: $id) {
            ${POST_FRAGMENT}
          }
          comments(post_id: $id, with_trashed: $with_trashed) {
            ${COMMENT}
          }
        }
      `, {
        id: parseInt(route.params.postId),
        with_trashed: true
      })

      commentsStore.$patch(state => {
        state.list = data.value.comments
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