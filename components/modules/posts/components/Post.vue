<template>
  <article class="post py-6">
    <div v-if="full" @click="isEdit = !isEdit">edit</div>
    <div class="flex">
      <nuxt-link :to="{name: 'users.show', params: {userId: content.user_id }}">
        <img :src="content.user.avatar" :alt="content.user.name" class="block w-10 h-10 rounded-full">
      </nuxt-link>
      <div class="ml-2 text-sm">
        <nuxt-link :to="{name: 'users.show', params: {userId: content.user_id }}" class="font-semibold inline-block">{{ content.user.name }}</nuxt-link>
        <div class="text-gray-600">{{ content.created_at }}</div>
      </div>
    </div>

    <PostForm v-if="isEdit" :post="content" @updated="onUpdated" />
    <component v-else
        class="mt-4"
        :is="full
      ? PostBodyFull
      : PostBody"
        :post="content"
    >
    </component>
    <div v-if="content.hashtags.length > 0" class="mt-4 space-x-2">
      <nuxt-link v-for="hashtag in content.hashtags" :to="`/search/${hashtag}`">#{{ hashtag }}</nuxt-link>
    </div>

    <footer class="flex items-center text-xs font-semibold space-x-4 mt-4">
      <NuxtLink :to="{name: 'posts.show', params: {postId: content.id}, hash: '#comments'}" class="flex items-center space-x-1">
        <ChatBubbleBottomCenterIcon class="w-4 h-4" />
        <span>{{ content.comments_count }}</span>
      </NuxtLink>
      <VLike model-type="posts" :model-id="content.id" :is-liked="content.like.is_liked" :count="content.likes_count" />
    </footer>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import PostBody from './PostBody.vue'
import PostBodyFull from './PostBodyFull.vue'
import PostForm from './PostForm'
import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/24/outline'
import VLike from '~/components/library/VLike';

const props = defineProps({
  content: {
    type: Object,
    required: true
  },
  full: {
    type: Boolean,
    default: false
  }
})

const isEdit = ref(false)

const onUpdated = (newContent) => {
  Object.assign(props.content, newContent)
  isEdit.value = false
}
</script>