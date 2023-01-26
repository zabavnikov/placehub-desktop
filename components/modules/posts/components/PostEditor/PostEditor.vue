<template>
  <div>
    <div v-for="item in items" :key="item.id">
      <PostEditorItem v-model:images="item.images" v-model:text="item.text" />
      {{ item.text }}
    </div>

    <!-- Загрузка изображений. -->
    <div v-if="items.length === 0">
      <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500" @click="$refs.upload.$el.click()">
        <ImagePlus class="w-5 h-5" />
      </button>
      <Upload
          :fields="['id', 'url']"
          :presets="['default@width:640,height:480']"
          class="hidden"
          model-type="posts"
          ref="upload"
          @update:modelValue="addItem"
      />
    </div>
    <!-- / Загрузка изображений. -->
  </div>
</template>

<script setup>
import PostEditorItem from '~/components/modules/posts/components/PostEditor/PostEditorItem.vue'
import { ref } from 'vue'
import { Send, MapPin, ImagePlus, X } from 'lucide-vue-next'

const items = ref([])

const addItem = (images) => {
  if (items.value.length === 0) {
    items.value.push({
      images,
      text: '',
    })
  }
}
</script>