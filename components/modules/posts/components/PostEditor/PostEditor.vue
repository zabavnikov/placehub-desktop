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

const { $overlay } = useNuxtApp()
const schema = ref([])

const addBlock = (images) => {
  images.forEach((image) => {
    schema.value.push({
      id: Date.now(),
      images: [image],
      text: '',
    })
  })

  console.log(schema)
}

const onSubmit = () => {
  const data = cloneDeep(schema.value)

  data.map((block) => {
    block.images = block.images.map((image) => {
      return { id: image.id, text: image.text || '' }
    })

    return block
  })

  console.log(data)
}
</script>