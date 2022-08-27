<template>
  <section class="space-y-4 p-4">
    <comment-form @added="comments.unshift($event)" />

    <div v-for="(comment, index) in comments" :key="comment.id">
      <comment :comment="comment">
        <template #footer>
          <p @click="onReply(comment)">Ответить</p>
          <div v-if="comment.branch_replies_count" @click="toggleReplies[index] = !toggleReplies[index]">
            В ветке {{ comment.branch_replies_count }} ответов
          </div>
        </template>
      </comment>
      <comment-form
          v-if="commentsForm.form.parent_id === comment.id"
          @added="onPushReply(comment, $event)"
      />

      <!-- Replies -->
      <div v-if="comment.replies"
           v-show="comment.branch_replies_count <= 3 || toggleReplies[index]"
           class="mt-4 space-y-4 ml-8"
      >
        <div v-for="reply in comment.replies" :key="reply.id">
          <comment :comment="reply">
            <template #footer>
              <p @click="onReply(reply)">Ответить</p>
            </template>
          </comment>
          <comment-form v-if="commentsForm.form.parent_id === reply.id" @added="onPushReply(comment, $event)" />
        </div>
        <div
            v-if="comment.replies.length < comment.branch_replies_count"
            @click="onMore(comment)"
            class="p-2 bg-indigo-500/50 rounded-lg text-center cursor-pointer"
        >
          Показать еще
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Comment from './Comment'
import CommentForm from './CommentForm'
import {useCommentsStore} from '../stores/comments';
import {computed, ref, reactive } from 'vue';
import {COMMENT} from '../graphql';
import { useGQL } from '~/uses'

export default {
  props: {
    comments: {
      type: Array,
      default: () => [],
    }
  },
  components: {
    Comment,
    CommentForm,
  },
  setup(_, { $pinia }) {
    const commentsForm = useCommentsStore($pinia)
    const loading = ref(false)
    const toggleReplies = ref([]);

    const onReply = (comment) => {
      console.log(toggleReplies)
      commentsForm.toggle(comment)
    }

    const onPushReply = (comment, reply) => {
      if (! comment.hasOwnProperty('replies')) {
        comment.replies = reactive([])
      }
      comment.replies.push(reply)
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
            ${COMMENT}
          }
        }
      `, {
          model_type: comment.model_type,
          branch_id:  comment.id,
          offset:     comment.replies.length
        })

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
      commentsForm,
      onReply,
      onMore,
      onPushReply,
      toggleReplies
    }
  }
}
</script>