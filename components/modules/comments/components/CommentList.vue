<template>
  <section class="bg-white rounded-lg shadow ring-1 ring-offset-1 ring-gray-100">
    <header class="p-6 border-b border-gray-200">
      <h2 class="text-xl mb-4">Комментарии<span v-if="count > 0"> ({{ count }})</span></h2>
      <CommentForm
          :model-type="modelType"
          :model-id="modelId"
          @created="comments.unshift($event) "/>
    </header>

    <div class="divide-y divide-dashed divide-gray-200">
      <div v-for="(comment, index) in comments" :key="comment.id" class="p-6">
        <Comment :comment="comment"
          @toggle-replies="onMore(comment)"
        />

        <!-- Replies -->
        <div v-if="comment.replies" class="replies divide-y divide-dashed divide-gray-200 ml-8">
          <div v-for="reply in comment.replies" :key="reply.id" class="py-6 last:pb-0">
            <Comment :comment="reply" />
          </div>
        </div>
        <Button
          v-if="comment.replies.length && comment.branch_replies_count > comment.replies.length"
          variant="secondary"
          class="w-full mt-6"
          :disabled="loading"
          @click="onMore(comment)"
        >Показать еще {{ comment.branch_replies_count - comment.replies.length }}</Button>
      </div>
    </div>
  </section>
</template>

<script>
import Comment from './Comment'
import CommentForm from './CommentForm'
import { ref } from 'vue';
import { REPLY } from '../graphql';
import { useGQL } from '~/uses'
import { useCommentsStore } from '~/components/modules/comments/stores/comments'
import { Button } from '@placehub/ui'

export default {
  props: {
    modelType: {
      type: String,
      required: true,
    },
    modelId: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
    }
  },

  components: {
    Button,
    Comment,
    CommentForm
  },
  setup(_, { $pinia }) {
    const loading = ref(false)
    const comments = useCommentsStore($pinia)

    const onMore = async (comment) => {
      if (loading.value) {
        return
      }

      loading.value = true

      try {
        if (! Object.hasOwn(comment, 'replies')) {
          comment.replies = []
        }

        const { data } = await useGQL(`
          query ($model_type: String, $branch_id: Int, $offset: Int) {
            replies: comments(model_type: $model_type, branch_id: $branch_id, offset: $offset) {
              ${REPLY}
            }
          }
        `, {
          model_type: comment.model_type,
          branch_id:  comment.id,
          offset:     comment.replies.length
        })

        // После добавление ответа он добавляется в конец ветки,
        // но он также будет подгружен после нажатия на: показать еще,
        // для этого нужно удалить дубликаты и пересчитать branch_replies_count
        data.replies.forEach((newComment) => {
          comment.replies.forEach((oldComment, index) => {
            if (parseInt(oldComment.id) === parseInt(newComment.id)) {
              comment.replies.splice(index, 1)
            }
          })

          comment.replies.push(newComment)
        })

      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    return {
      onMore,
      comments: comments.list,
      loading
    }
  }
}
</script>