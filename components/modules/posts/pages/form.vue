<template>
  <TheLayout heading="Редактирование">
<!--    <PostEditor :post="form" />-->
    <Editor v-model="form" />

    <Button @click="onSubmit">Создать</Button>
  </TheLayout>
</template>

<script setup>
import PostEditor from '~/components/modules/posts/components/PostEditor/PostEditor.vue'
import { CREATE_POST, POST_FORM } from '../graphql'
import { ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useForm } from 'vee-validate'

const form = ref([])
const loading = ref(false)

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

const { handleSubmit, setErrors } = useForm()

const onSubmit = handleSubmit(async () => {
  if (loading.value) return

  loading.value = true

  const input = cloneDeep(form.value)

  input.map((block) => {
    if (block.type === 'image') {
      block.data = block.data.map((image) => {
        return { url: image.url }
      })
    }

    delete block.id

    return block
  })

  console.log(input)

  const variables = {
    input
  }

  try {
    const { data: { post }} = await useQuery({
      query: CREATE_POST,
      variables
    })

    form.value = []
  } catch (error) {
    if (error.message === 'validation') {
      setErrors(error.extensions.validation)
    }
  } finally {
    loading.value = false
  }
})
</script>