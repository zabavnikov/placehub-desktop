<template>
  <TheLayout>
    <template #header>
      Посты
    </template>
    <div>
      <div v-for="post in data.posts" :key="post.id">
        <NuxtLink :to="{name: 'posts.show', params: {postId: post.id}}">{{ post.text }}</NuxtLink>
      </div>
    </div>
  </TheLayout>
</template>

<script>
import { useGql } from '~/uses'

export default {
  async setup() {
    const { data, pending, error } = await useGql(`
      query {
        posts {
          id
          text
        }
      }
    `)

    return {
      data,
    }
  }
}
</script>