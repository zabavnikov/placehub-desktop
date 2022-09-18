<template>
  <article class="post p-6 bg-white rounded-lg shadow ring-1 ring-offset-1 ring-gray-100">
    <div class="flex items-center justify-between">
      <Profile :profile="content.user">
        <template #footer>
          {{ content.created_at }}
        </template>
      </Profile>
      <div class="flex items-center space-x-2">
        <div
            v-if="full"
            @click="isEdit = !isEdit" class="cursor-pointer text-indigo-800 hover:text-indigo-500">
          редактировать
        </div>
        <EllipsisHorizontalIcon
            @click="isEdit = !isEdit"
            class="w-6 h-6 cursor-pointer text-indigo-800 hover:text-indigo-500 hover:bg-indigo-50 rounded-full"/>
      </div>
    </div>

    <div class="mt-4">
      <PostForm v-if="isEdit" :post="content" @updated="onUpdated"/>
      <div v-else>
        <Component :is="full ? PostBodyFull : PostBody" :post="content"/>
        <PostGallery v-if="content.images.length > 0" class="mt-4" :images="content.images"/>

        <div v-if="content.hashtags.length > 0" class="mt-4 space-x-2">
          <nuxt-link v-for="hashtag in content.hashtags" :to="`/search/${hashtag}`">#{{ hashtag }}</nuxt-link>
        </div>

        <footer class="flex items-center space-x-4 mt-4">
          <NuxtLink :to="{name: 'posts.show', params: {postId: content.id}, hash: '#comments'}"
                    class="flex items-center space-x-1">
            <ChatBubbleBottomCenterIcon class="w-4 h-4"/>
            <span>{{ content.comments_count }}</span>
          </NuxtLink>
          <VLike model-type="posts" :model-id="content.id" :is-liked="content.like.is_liked"
                 :count="content.likes_count"/>
        </footer>
      </div>
    </div>


  </article>
</template>

<script setup>
import {ref} from 'vue' 
import PostBody from './PostBody.vue'
import PostBodyFull from './PostBodyFull.vue'
import PostGallery from './PostGallery.vue'
import PostForm from './PostForm'
import {ChatBubbleBottomCenterIcon, EllipsisHorizontalIcon} from '@heroicons/vue/24/outline'
import VLike from '~/components/library/VLike';
import Profile from '~/components/modules/users/components/Profile'

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
  Object.assign({}, props.content, newContent)
  isEdit.value = false
}
</script>