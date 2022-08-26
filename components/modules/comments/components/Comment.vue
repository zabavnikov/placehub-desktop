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
    <p class="leading-relaxed font-semibold text-gray-900">
      {{ comment.text }}
    </p>
    <footer class="flex text-red-700 text-sm flex space-x-4 mt-2">
      <p @click="$emit('reply')">Ответить</p>
      <div v-if="comment.branch_replies_count">
        В ветке {{ comment.branch_replies_count }} ответов
      </div>
    </footer>
    <section class="mt-2">
<!--      <comment-form v-if="isReplyForm" @added="onPushReply" @cancel="form.parent_id = null" />-->
    </section>
  </article>
</template>

<script>
export default {
  name: 'Comment',

  emits: ['reply'],

  props: {
    comment: {
      type:     Object,
      required: true,
    },
  },
}
</script>