<template>
  <TheLayout>
    <template #top>
      <ProfileHeader :user="data.user" />
    </template>
    <post-form v-if="$auth.loggedIn" @created="data.posts.unshift($event)" class="mb-4"></post-form>

    <div v-if="data.posts.length">
      <post v-for="(post, index) in data.posts" @delete="data.posts.splice(index, 1)" :key="post.id" :content="post"></post>
    </div>
    <div v-else class="text-gray p-3 bg-gray-50 border border-solid border-gray-100 rounded-lg">Ничего не найдено</div>
  </TheLayout>
</template>

<script setup>
import { useRoute } from '#app'
import Post from '~/components/modules/posts/components/Post'
import PostForm from '~/components/modules/posts/components/PostForm'
import ProfileHeader from '../components/ProfileHeader'
import { GET_USER } from '~/components/modules/users/graphql'
import { GET_POSTS } from '~/components/modules/posts/graphql'
import { useAsyncGql } from '~/uses'

const route = useRoute()

const { data } = await useAsyncGql(`
  query($userId: ID!) {
    ${GET_USER}
    ${GET_POSTS}
  }
`, {
  userId: route.params.userId
})
</script>

