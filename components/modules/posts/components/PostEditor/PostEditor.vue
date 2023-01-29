<template>
  <div class="space-y-4">
    <FormField name="input.title">
      <Input placeholder="Введите название фотоотчета" />
    </FormField>

    <div v-for="(block, index) in schema" :key="block.id">
      <PostEditorBlock
        v-model:images="block.images"
        v-model:text="block.text"
        @update:images="deleteBlockIsEmpty(block, index)"
      />
    </div>

    <!-- Загрузка изображений. -->
    <PostEditorUpload @add-block="addBlock" :schema-not-empty="schema.length" />
    <!-- / Загрузка изображений. -->
  </div>
</template>

<script setup>
import PostEditorBlock from '~/components/modules/posts/components/PostEditor/PostEditorBlock.vue'
import PostEditorUpload from '~/components/modules/posts/components/PostEditor/PostEditorUpload.vue'
import { ref } from 'vue'
import { Send, MapPin, ImagePlus, X } from 'lucide-vue-next'
import { useNuxtApp } from 'nuxt/app'

const { $overlay } = useNuxtApp()
const schema = ref([])

const addBlock = (images) => {
  images.forEach((image) => {
    schema.value.push({
      images: [image],
      text: '',
    })
  })

  console.log(schema)
}

const deleteBlockIsEmpty = (block, index) => {
  if (block.images.length === 0) {
    schema.value.splice(index, 1)
  }
}
</script>