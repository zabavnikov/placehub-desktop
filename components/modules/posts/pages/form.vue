<template>
  <TheLayout heading="Редактирование поста">
    <div class="bg-white rounded-lg border border-neutral-200">
      <PostForm :post="form" />
    </div>
  </TheLayout>
</template>

<script setup>
import PostForm from '~/components/modules/posts/components/PostForm'
import { POST_FORM } from '../graphql'
import { ref } from 'vue'
import { useRoute } from 'nuxt/app'

const form = ref({})

try {
  const { data: { post }} = await useFetch({
    query: `
      query ($id: Int!) {
        post(id: $id) {
          ${POST_FORM}
        }
      }
    `,
    variables: {
      id: parseInt(useRoute().params.postId),
    }
  })

  form.value = post
} catch (error) {
  console.log(error)
}
</script>