<template>
  <section>
    <CommentForm
        :model-type="modelType"
        :model-id="modelId"
        @created="comments.unshift($event) "/>

    <div class="divide-y">
      <div v-for="(comment, index) in comments" :key="comment.id">
        <Comment :comment="comment"
          @toggle-replies="toggleReplies[index] = !toggleReplies[index]"
          class="m-4"
        />

        <!-- Replies -->
        <div v-if="comment.replies" v-show="!toggleReplies[index]" class="ml-8 divide-y">
          <div v-for="reply in comment.replies" :key="reply.id">
            <Comment :comment="reply" class="m-4" />
          </div>
        </div>
        <div
            v-if="comment.branch_replies_count > comment.replies.length"
            @click="onMore(comment)"
            class="p-2 mx-4 mb-4 bg-gray-300/50 font-semibold text-xs rounded-lg text-center cursor-pointer"
        >
          Показать еще {{ comment.branch_replies_count - comment.replies.length }}
        </div>
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

export default {
  props: {
    modelType: {
      type: String,
      required: true,
    },
    modelId: {
      type: Number,
      required: true,
    }
  },

  components: {
    Comment,
    CommentForm
  },
  setup(_, { $pinia }) {
    const loading = ref(false)
    const toggleReplies = ref([]);
    const comments = useCommentsStore($pinia)

    const onMore = async (comment) => {
      if (loading.value) {
        return
      }

      loading.value = true

      try {
        const { data } = await useGQL(`
          query ($model_type: String, $branch_id: Int, $offset: Int) {
            replies: comments(model_type: $model_type, branch_id: $branch_id, offset: $offset) {
              ${REPLY}
            }
          }
        `, {
          model_type: comment.model_type,
          branch_id:  comment.id,
          offset:     comment.replies.length - comment.new_replies_count
        })

        comment.new_replies_count = 0

        // После добавление овета он добавляется в конец ветки,
        // но он также будет подгружен после нажатия на Показать еще,
        // для этого нужно удалить дубликаты и пересчитать branch_replies_count
        data.replies.forEach((newComment) => {
          comment.replies.forEach((oldComment, index) => {
            if (parseInt(oldComment.id) === parseInt(newComment.id)) {
              comment.replies.splice(index, 1)
              comment.branch_replies_count--
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
      toggleReplies,
      comments: comments.list
    }
  }
}
</script>