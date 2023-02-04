<template>
  <div class="space-y-4">
    <FormField name="input.title">
      <Input placeholder="Введите название фотоотчета" />
    </FormField>

    <div class="space-y-6">
      <Draggable v-model="schema" item-key="id">
        <template #item="{ element, index }">
          <PostEditorBlock
            v-model:images="element.images"
            v-model:text="element.text"
            @deleteBlock="schema.splice(index, 1)"
          />
        </template>
      </Draggable>

      <!-- Загрузка изображений. -->
      <PostEditorUpload @add-block="addBlock" :schema-not-empty="schema.length > 0" />
      <!-- / Загрузка изображений. -->
    </div>

    <Button @click="onSubmit">Создать</Button>
  </div>
</template>

<script setup>
import PostEditorBlock from '~/components/modules/posts/components/PostEditor/PostEditorBlock.vue'
import PostEditorUpload from '~/components/modules/posts/components/PostEditor/PostEditorUpload.vue'
import { ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'
import { cloneDeep } from 'lodash-es'
import Draggable from 'vuedraggable'
import { pick } from 'lodash'
import { CREATE_POST, UPDATE_POST } from '~/components/modules/posts/graphql'
import { useForm } from 'vee-validate'

const { $overlay } = useNuxtApp()
const schema = ref([])
const loading = ref(false)

const addBlock = (images) => {
  images.forEach((image) => {
    schema.value.push({
      id: Date.now(),
      images: [image],
      text: '',
      type: 'image',
    })
  })

  console.log(schema)
}

const { handleSubmit, setErrors } = useForm()

const onSubmit = handleSubmit(async () => {
  if (loading.value) return

  loading.value = true

  const input = cloneDeep(schema.value)

  input.map((block) => {
    block.images = block.images.map((image) => {
      return { id: image.id, text: image.text || '' }
    })

    delete block.id

    return block
  })

  console.log(input)

  const variables = {
    input
  }

  try {
    const { data: { post }} = await useFetch({
      query: CREATE_POST,
      variables
    })

    schema.value = []
  } catch (error) {
    if (error.message === 'validation') {
      setErrors(error.extensions.validation)
    }
  } finally {
    loading.value = false
  }
})
</script>