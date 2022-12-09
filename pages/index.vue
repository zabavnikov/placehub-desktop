<template>
  <TheLayout>
    <PostForm v-if="$auth.loggedIn" @created="pulse.unshift($event)" class="mb-6" />

    <div class="space-y-10">
      <Post v-for="post in pulse" :key="post.id" :content="post" />
    </div>
  </TheLayout>
</template>

<script setup>
import Card from '~/components/Card'
import Post from '~/components/modules/posts/components/Post'
import PostForm from '~/components/modules/posts/components/PostForm'
import TheLayout from '~/components/layout/TheLayout'
import { POST_CARD } from '~/components/modules/posts/graphql'
import { ref } from 'vue'

const pulse = ref([])

const query = `
  query {
    pulse {
      ...on Post {
        ${POST_CARD}
      }
    }
  }
`

try {
  const { data } = await useFetch({
    query
  })

  pulse.value = data.pulse
} catch (error) {}
</script>
