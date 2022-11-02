<template>
  <TheLayout>
    <template #sidebar>12</template>
    <div class="divide-y divide-slate-200">
      <post v-for="post in data.posts" :key="post.id" :content="post" />
    </div>
  </TheLayout>
</template>



<script lang="ts" setup>
import { POST_CARD } from '../graphql'
import Post from '~/components/modules/posts/components/Post'
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