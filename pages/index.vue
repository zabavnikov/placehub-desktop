<template>
  <TheLayout>
    <div class="space-y-4 mt-4">
      <Card v-if="$auth.loggedIn">
        <PostForm @created="data.posts.unshift($event)"></PostForm>
      </Card>
      <Post v-for="post in data.posts" :key="post.id" :content="post" />
    </div>
  </TheLayout>
</template>

<script lang="ts" setup>
import Card from '~/components/Card'
import { POST_CARD } from '~/components/modules/posts/graphql'
import Post from '~/components/modules/posts/components/Post'
import TheLayout from '~/components/layout/TheLayout'
import PostForm from '~/components/modules/posts/components/PostForm'
import { gql, useAsyncQuery } from '#imports'

const query = gql`
  query {
    posts {
      ${POST_CARD}
    }
  }
`

const { data } = await useAsyncQuery(query)
</script>
