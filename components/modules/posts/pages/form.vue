<template>
  <TheLayout heading="Редактирование поста">
    <div class="bg-white rounded-lg border border-neutral-200 h-full">
      <PostForm :post="form.post" />
    </div>
  </TheLayout>
</template>

<script setup>
import PostForm from '~/components/modules/posts/components/PostForm'
import { POST_FORM } from '../graphql'
import { gql, useAsyncQuery } from '#imports'
import { ref } from 'vue'
import { useRoute } from 'nuxt/app'

const form = ref({})

try {
  const route = useRoute()

  const { data } = await useAsyncQuery(gql`
    query ($id: Int!) {
      post(id: $id) {
        ${POST_FORM}
      }
    }
  `, {
    id: parseInt(route.params.postId),
  })

  form.value = data.value
} catch (error) {}
</script>