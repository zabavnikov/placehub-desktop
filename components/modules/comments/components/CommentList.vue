<template>
  <section>
    <comment-form
        :model-type="modelType"
        :model-id="modelId"
        @cancel="active = null"
        @added="comments.unshift($event)" />

    <div class="divide-y">
      <div v-for="(comment, index) in comments" :key="comment.id">
        <comment :comment="comment" class="m-4">
          <template #footer>
            <p @click="onReply(comment)" class="cursor-pointer">ответить</p>
            <div v-if="comment.branch_replies_count > 0" @click="toggleReplies[index] = !toggleReplies[index]" class="cursor-pointer">
              в ветке {{ comment.branch_replies_count }} ответов
            </div>
          </template>
        </comment>
        <comment-form
            class="m-4"
            v-if="active === comment.id"
            :model-type="modelType"
            :model-id="modelId"
            :parent-id="comment.id"
            @cancel="active = null"
            @added="onPushReply(comment, $event)"
        />

        <!-- Replies -->
        <div v-if="comment.replies" v-show="!toggleReplies[index]" class="ml-8 divide-y">
          <div v-for="reply in comment.replies" :key="reply.id">
            <comment :comment="reply" class="m-4">
              <template #footer>
                <p @click="onReply(reply)">ответить</p>
              </template>
            </comment>

            <comment-form
                v-if="active === reply.id"
                :model-type="modelType"
                :model-id="modelId"
                :parent-id="reply.id"
                class="m-4"
                @cancel="active = null"
                @added="onPushReply(comment, $event)"
            />
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

export default {
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
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
  setup() {
    const loading = ref(false)
    const toggleReplies = ref([]);
    const active = ref(null)

    const onReply = (comment) => {
      active.value = comment.id
    }

    const onPushReply = (comment, reply) => {
      if (! comment.hasOwnProperty('replies')) {
        comment.replies = []
      }
      comment.replies.push(reply)
      comment.branch_replies_count++

      // Скрыли форму
      active.value = null
    }

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
          offset:     comment.replies.length
        })

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
      onReply,
      onMore,
      onPushReply,
      toggleReplies,
      active
    }
  }
}
</script>