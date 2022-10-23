<template>
  <article class="post p-6 bg-white rounded-lg shadow ring-1 ring-offset-1 ring-gray-100">
    <div class="flex items-center justify-between">
      <Profile :profile="content.user">
        <template #footer>
          {{ content.created_at }}
        </template>
        <template v-if="content.repost" #top-right>
          <NuxtLink :to="{name: 'users.show', params: {userId: content.repost.user.id }}">
            <img :src="content.repost.user.avatar" :alt="content.repost.user.name" class="w-full h-full">
          </NuxtLink>
        </template>
      </Profile>
      <div class="flex items-center space-x-2">
        <div
            v-if="full"
            @click="isEdit = !isEdit" class="cursor-pointer text-indigo-800 hover:text-indigo-500">
          редактировать
        </div>
        <EllipsisHorizontalIcon
            v-if="full"
            @click="onDelete"
            class="w-6 h-6 cursor-pointer text-indigo-800 hover:text-indigo-500 hover:bg-indigo-50 rounded-full"/>
      </div>
    </div>

    <div class="mt-4">
      <PostForm v-if="isEdit" :post="content" @updated="onUpdated"/>
      <div v-else>
        <PostRepost v-if="content.repost" :repost="content.repost" />
        <div v-else>
          <Component v-if="content.text" :is="full ? PostBodyFull : PostBody" :post="content"/>

          <div v-if="content.hashtags.length > 0" class="mt-4 space-x-2 text-gray-500 text-xs">
            <nuxt-link v-for="hashtag in content.hashtags" :to="`/search/${hashtag}`">#{{ hashtag }}</nuxt-link>
          </div>

          <PostGallery v-if="content.images.length > 0" class="mt-4" :images="content.images"/>
        </div>

        <footer class="flex items-center space-x-4 mt-4">
          <NuxtLink :to="{name: 'posts.show', params: {postId: content.id}, hash: '#comments'}"
                    class="flex items-center space-x-1">
            <ChatBubbleBottomCenterIcon class="w-4 h-4"/>
            <span>{{ content.comments_count }}</span>
          </NuxtLink>
          <VLike model-type="posts" :model-id="content.id" :is-liked="content.like.is_liked"
                 :count="content.likes_count"/>
          <div @click="onRepost" class="cursor-pointer flex items-center space-x-1">
            <ArrowUturnRightIcon class="w-4 h-4"/>
            <!-- В репостах не показываем счетчик, так как репост репоста, это репост оригинала. -->
            <span v-if="content.repost_type === null">{{ content.reposts_count }}</span>
          </div>
        </footer>
      </div>
    </div>


  </article>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'
import PostBody from './PostBody.vue'
import PostBodyFull from './PostBodyFull.vue'
import PostGallery from './PostGallery.vue'
import PostRepost from './PostRepost.vue'
import PostForm from './PostForm'
import {ChatBubbleBottomCenterIcon, EllipsisHorizontalIcon, ArrowUturnRightIcon} from '@heroicons/vue/24/outline'
import VLike from '~/components/library/VLike';
import Profile from '~/components/modules/users/components/Profile'
import { useNuxtApp, useRouter } from 'nuxt/app'
import { useGql } from '~/uses'

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

const { $overlay } = useNuxtApp()
const router = useRouter()

const isEdit = ref(false)

const onUpdated = (newContent) => {
  Object.assign(props.content, newContent)
  isEdit.value = false
}

const onDelete = () => {
  $overlay.show(defineAsyncComponent(() => import('~/components/common/DeleteConfirmDialog.vue')), {
    props: {
      title:  'Удалить публикацию?',
      text:   'После удаления публикацию нельзя будет восстановить.',
      mutation: `
        mutation($id: Int!) {
          deletePost(id: $id)
        }
      `,
      mutationName: 'deletePost',
      variables: {
        id: props.content.id
      }
    },
    on: {
      deleted() {
        $overlay.hide()
        router.push({name: 'users.show', params: {userId: props.content.user_id}})
      }
    }
  })
}

const onRepost = async () => {
  try {
    const { data } = useGql(`
      mutation($repost_type: String!, $repost_id: Int!) {
        createRepost(repost_type: $repost_type, repost_id: $repost_id)
      }
    `, {
      repost_type: 'posts',
      repost_id:    parseInt(props.content.id)
    })

    if (data) {}
  } catch (error) {}
}
</script>