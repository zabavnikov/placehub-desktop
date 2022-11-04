<template>
  <TheLayout slot="default">
    <div class="divide-y divide-slate-200">
      <PostForm v-if="$auth.loggedIn" @created="data.posts.unshift($event)"></PostForm>
      <Post v-for="post in data.posts" :key="post.id" :content="post" />
    </div>
  </TheLayout>
</template>

<script lang="ts" setup>
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
