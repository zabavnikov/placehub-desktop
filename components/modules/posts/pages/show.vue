<template>
  <TheLayout>
    <div class="p-4">
      <div class="flex">
        <NuxtLink to="/">
          <img :src="post.user.avatar" :alt="post.user.name" class="block w-10 h-10 rounded-full">
        </NuxtLink>
        <div class="ml-2 text-sm">
          <NuxtLink to="/" class="font-semibold inline-block">{{ post.user.name }}</NuxtLink>
          <div class="text-gray-600">{{ post.created_at }}</div>
        </div>
      </div>
      <div class="mt-4">
        <div class="whitespace-pre-line">{{ post.text }}</div>
      </div>
    </div>
  </TheLayout>
</template>

<script>
import { useRoute } from '#app'
import { useGql } from '~/uses'
import { POST_FRAGMENT } from '../graphql'

export default {
  async setup() {
    const route = useRoute();

    const { data, error } = await useGql(`
      query ($id: Int!) {
        post(id: $id) {
          ${POST_FRAGMENT}
        }
      }
    `, {
      id: parseInt(route.params.postId)
    })

    return {
      post: data.value.post
    }
  }
}
</script>