<template>
  <div>
    <div v-for="(block, index) in schema" :key="block.id">
      <PostEditorBlock
        v-model:images="block.images"
        v-model:text="block.text"
        @update:images="deleteBlockIsEmpty(block, index)"
      />
    </div>

    <!-- Загрузка изображений. -->
    <div>
      <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500" @click="$refs.upload.$el.click()">
        <ImagePlus class="w-5 h-5" />
      </button>
      <Upload
          :fields="['id', 'url']"
          :presets="['default@width:640,height:480']"
          class="hidden"
          model-type="posts"
          ref="upload"
          @update:modelValue="addBlock"
      />
    </div>
    <!-- / Загрузка изображений. -->
  </div>
</template>

<script setup>
import PostEditorBlock from '~/components/modules/posts/components/PostEditor/PostEditorBlock.vue'
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