<template>
  <TheLayout>
    <template #hero>
      <ProfileHero :user="user" />
    </template>
    <div v-if="posts.length" class="space-y-6">
      <post v-for="(post, index) in posts" @delete="posts.splice(index, 1)" :key="post.id" :content="post"></post>
    </div>
    <div v-else class="text-gray p-3 bg-gray-50 border border-solid border-gray-100 rounded-lg">Ничего не найдено</div>
  </TheLayout>
</template>

<script setup>
import Post from '~/components/modules/posts/components/Post'
import ProfileHero from '../components/ProfileHero'
import { POST_CARD } from '~/components/modules/posts/graphql'
import { USER } from '~/components/modules/users/graphql'
import { useFetch } from '#imports'
import { useRoute, useNuxtApp } from '#app/nuxt'

const route = useRoute()
const { $overlay } = useNuxtApp()
let posts = []
let user = []

try {
  const { data } = await useFetch({
    query: `
      query($userId: Int!) {
        posts(userId: $userId) {
          ${POST_CARD}
        }
        ${USER}
      }
    `,
    variables: {
      userId: parseInt(route.params.userId)
    }
  })

  posts = data.posts
  user = data.user
} catch (error) {
  console.log(error)
}
</script>

