<template>
  <article :id="`comment-${comment.id}`">
    <header class="flex items-center">
      <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}" class="mr-3 flex-shrink-0">
        <img :src="comment.user.avatar" :alt="comment.user.name" class="w-8 h-8 bg-gray-300/50 rounded-full block">
      </nuxt-link>
      <div>
        <div class="flex items-center space-x-1">
          <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}" class="font-semibold">
            {{ comment.user.name }}
          </nuxt-link>
          <span v-if="comment.parent" class="flex items-center space-x-1 text-gray-800">
            <span>ответ</span>
            <comment-reply-popover :comment="comment.parent">
              <template #button>
                <span class="text-indigo-500 cursor-pointer">{{ comment.parent.user.name }}</span>
              </template>
            </comment-reply-popover>
          </span>
        </div>
        <div class="text-xs font-semibold text-gray-500">{{ comment.created_at }}</div>
      </div>
    </header>
    <p class="leading-relaxed font-semibold text-gray-900 mt-2 overflow-hidden">
      {{ comment.text }}
    </p>
    <footer class="flex space-x-4 mt-2">
      <slot name="footer"></slot>
    </footer>
  </article>
</template>

<script setup>
import CommentReplyPopover from './CommentReplyPopover'
</script>

<script>
export default {
  name: 'Comment',

  props: {
    comment: {
      type:     Object,
      required: true,
    },
  },
}
</script>