<template>
  <article>
    <header class="flex items-center">
      <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}" class="mr-3 flex-shrink-0">
        <img :src="comment.user.avatar" :alt="comment.user.name" class="w-8 h-8 bg-gray-300/50 rounded-full block">
      </nuxt-link>
      <div>
        <div>
          <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}" class="underline">
            {{ comment.user.name }}
          </nuxt-link>
          <span v-if="comment.parent" :title="comment.parent.text" class="text-gray-800">
            ответ
            <span class="text-indigo-500">{{ comment.parent.user.name }}</span>
          </span>
        </div>
        <div class="text-xs text-gray-500">{{ comment.created_at }}</div>
      </div>
    </header>
    <section class="mt-2">
      <p class="leading-relaxed font-semibold text-gray-900">
        {{ comment.text }}
      </p>
      <footer class="flex text-red-700 text-sm flex space-x-4">
        <p @click="onReply">Ответить</p>
        <div class="cursor-pointer">{{ comment.replies_count }}</div>
      </footer>
      <comment-form v-if="isReplyForm" @added="comment.replies.unshift($event)" @cancel="form.parent_id = null" />
    </section>
    <div v-if="comment.replies" class="mt-4 space-y-4" :class="{'ml-8': depth === 0}">
      <comment v-for="reply in comment.replies" :depth="depth + 1" :comment="reply" :key="reply.id" />
      <div v-if="depth === 0" @click="onMore" class="p-2 bg-indigo-500/50 rounded-lg text-center cursor-pointer">Показать еще</div>
    </div>
  </article>
</template>

<script>
import { computed, ref, reactive } from 'vue'
import { useGQL } from '~/uses'
import { useCommentsStore } from '../stores/comments'
import CommentForm  from './CommentForm'
import { COMMENT } from '../graphql';

export default {
  name: 'Comment',

  props: {
    comment: {
      type:     Object,
      required: true,
    },
    depth: {
      type: Number,
      default: 0
    }
  },

  components: {
    CommentForm
  },

  setup({ comment, depth }, { $pinia }) {
    const comments = useCommentsStore($pinia)
    const loading = ref(false)

    if (! comment.hasOwnProperty('replies')) {
      comment.replies = reactive([]);
    }

    const onReply = () => {
      comments.toggle(comment)
    }

    const onMore = async () => {
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

        data.replies.forEach(reply => comment.replies.push(reply))
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    return {
      avatarClasses: [
        comment.parent_id > 0
          ? 'w-6 h-6'
          : 'w-8 h-8'
      ],
      isReplyForm: computed(() => comments.form.parent_id === comment.id),
      onReply,
      onMore
    }
  }
}
</script>