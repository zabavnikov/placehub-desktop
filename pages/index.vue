<template>
  <TheLayout>
    <div class="space-y-4 mt-4">
      <Card v-if="$auth.loggedIn">
        <PostForm @created="pulse.unshift($event)"></PostForm>
      </Card>
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
import { gql, useAsyncQuery } from '#imports'
import { ref } from 'vue'

const pulse = ref([])

const query = gql`
  query {
    pulse {
      ...on Post {
        ${POST_CARD}
      }
    }
  }
`

try {
  const { data } = await useAsyncQuery(query)

  pulse.value = data.value.pulse
} catch (error) {}
</script>
