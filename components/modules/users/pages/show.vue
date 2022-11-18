<template>
  <TheLayout>
    <ProfileHeader slot="top" :profile="data.user" />

    <div @click="onEdit">onEdit</div>

    <div v-if="data.posts.length" class="space-y-6">
      <post v-for="(post, index) in data.posts" @delete="data.posts.splice(index, 1)" :key="post.id" :content="post"></post>
    </div>
    <div v-else class="text-gray p-3 bg-gray-50 border border-solid border-gray-100 rounded-lg">Ничего не найдено</div>
  </TheLayout>
</template>

<script setup>
import { useRoute, useNuxtApp } from 'nuxt/app'
import Post from '~/components/modules/posts/components/Post'
import ProfileHeader from '../components/ProfileHeader'
import { USER } from '~/components/modules/users/graphql'
import { POST_CARD } from '~/components/modules/posts/graphql'
import { useAsyncGql } from '~/uses'
import Dialog from '~/components/common/Dialog'

const route = useRoute()
const { $overlay } = useNuxtApp()

const { data } = await useAsyncGql(`
  query($userId: Int!) {
    posts(userId: $userId) {
      ${POST_CARD}
    }
    ${USER}
  }
`, {
  userId: parseInt(route.params.userId)
})

const onEdit = () => {
  $overlay.show(Dialog, {
    props: {
      title: 'Прикол!'
    },
  })
}
</script>

