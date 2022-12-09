<template>
  <div>
    <header class="flex items-center justify-between mb-2">
      <Profile :profile="content.user">
        <template #footer>
          {{ content.created_at }}
        </template>
      </Profile>
      <div class="flex items-center space-x-2">
        <NuxtLink :to="{name: 'posts.edit', params: {postId: content.id}}" class="cursor-pointer text-indigo-800 hover:text-indigo-500">
          <Pencil class="w-5 h-5" />
        </NuxtLink>
        <Trash v-if="full" @click="onDelete" class="w-5 h-5 cursor-pointer text-red" />
      </div>
    </header>

    <section>
      <Component v-if="content.text" :is="full ? PostBodyFull : PostBody" :post="content"/>

      <div v-if="content.hashtags.length > 0" class="mt-4 space-x-2 text-gray-500 text-xs">
        <nuxt-link v-for="hashtag in content.hashtags" :to="`/search/${hashtag}`">#{{ hashtag }}</nuxt-link>
      </div>

      <PostGallery v-if="content.images.length > 0" class="mt-4" :images="content.images"/>

      <footer class="flex items-center space-x-4 mt-4">
        <VLike model-type="posts" :model-id="content.id" :is-liked="content.like.is_liked"
               :count="content.likes_count"/>
        <div @click="onRepost" class="cursor-pointer flex items-center space-x-1">
          <Share2 class="w-5 h-5 text-gray-500"/>
          <!-- В репостах не показываем счетчик, так как репост репоста, это репост оригинала. -->
          <span v-if="content.repost_type === null">{{ content.shares_count }}</span>
        </div>
        <LatestCommentatorsList :commentators="content.latestCommentators" :count="content.comments_count" :post-id="content.id" />
      </footer>
    </section>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'
import PostBody from './PostBody.vue'
import PostBodyFull from './PostBodyFull.vue'
import PostGallery from './PostGallery.vue'
import LatestCommentatorsList from '~/components/modules/comments/components/LastestCommentorsList'
import { Pencil, Trash, Share2 } from 'lucide-vue-next'
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

<style>
.is-edit {
  background-color: #f1f1f1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%239C92AC' fill-opacity='0.07'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");
}
</style>