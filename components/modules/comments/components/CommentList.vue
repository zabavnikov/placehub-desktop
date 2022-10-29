<template>
  <section class="bg-white rounded-lg shadow ring-1 ring-offset-1 ring-gray-100">
    <header class="p-4 border-b border-gray-200">
      <h2 class="text-xl mb-4">Комментарии<span v-if="count > 0"> ({{ count }})</span></h2>
      <CommentForm
          :model-type="modelType"
          :model-id="modelId"
          @created="comments.unshift($event) "/>
    </header>

    <div class="divide-y divide-dashed divide-gray-200">
      <div v-for="comment in comments" :key="comment.id">
        <div class="p-4" :id="`comment-${comment.id}`">
          <Comment :comment="comment" @toggle-replies="onMoreReplies(comment)" />
        </div>

        <!-- Replies -->
        <div v-if="comment.replies" class="replies divide-y divide-dashed divide-gray-200">
          <TransitionGroup name="list">
            <div v-for="reply in comment.replies" :key="reply.id" class="py-4 pr-4 pl-12" :id="`comment-${reply.id}`">
              <Comment :comment="reply" />
            </div>
          </TransitionGroup>
        </div>
        <Button
          v-if="Object.keys(comment.replies).length && comment.branch_replies_count > Object.keys(comment.replies).length"
          variant="secondary"
          class="w-full mt-6"
          :disabled="loading"
          @click="onMoreReplies(comment)"
        >Показать еще {{ comment.branch_replies_count - Object.keys(comment.replies).length }}</Button>
      </div>
    </div>

    <Button variant="secondary" @click="onMore">Показать еще</Button>
  </section>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: background-color 2s ease;
}
.list-enter-from,
.list-leave-to {
  @apply bg-amber-100;
}
</style>

<script>
import Comment from './Comment'
import CommentForm from './CommentForm'
import { ref } from 'vue';
import { REPLY } from '../graphql';
import { useGQL } from '~/uses'
import { useCommentsStore } from '~/components/modules/comments/stores/comments'
import { Button } from '@placehub/ui'
import { useOnMore } from '../uses/useOnMore'

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
  setup(props, { $pinia }) {
    const loading = ref(false)
    const comments = useCommentsStore($pinia)
    const page = ref(0)

    const onMore = async () => {
      const newComments = await useOnMore(props.modelType, props.modelId, comments.list.length)

      newComments.forEach(comment => {
        comments.list.push(comment)
      })
    }

    const onMoreReplies = async (comment) => {
      if (loading.value) {
        return
      }

      loading.value = true

      try {
        if (comment.replies.length === 0) {
          comment.replies = {}
        }

        const { data } = await useGQL(`
          query ($model_type: String, $branch_id: Int, $page: Int) {
            replies: comments(model_type: $model_type, branch_id: $branch_id, page: $page) {
              ${REPLY}
            }
          }
        `, {
          model_type: comment.model_type,
          branch_id:  comment.id,
          page:       page.value++
        })

        // После добавление ответа он добавляется в конец ветки,
        // но он также будет подгружен после нажатия на: показать еще,
        // для этого нужно удалить дубликаты и пересчитать branch_replies_count
        data.replies.forEach((newComment) => {
          if (! Object.hasOwn(comment.replies, newComment.id)) {
            comment.replies[newComment.id] = newComment
          }
        })

      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    return {
      onMoreReplies,
      onMore,
      comments: comments.list,
      loading
    }
  }
}
</script>