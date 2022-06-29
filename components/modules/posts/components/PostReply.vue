<template>
  <article class="post p-6" @click="onClick">
    <div class="flex">
      <nuxt-link to="/">
        <img :src="content.user.avatar" :alt="content.user.name" class="block w-10 h-10 rounded-full">
      </nuxt-link>
      <div class="ml-2 text-sm">
        <nuxt-link to="/" class="font-semibold inline-block">{{ content.user.name }}</nuxt-link>
        <div class="text-gray-600">{{ content.created_at }}</div>
      </div>
    </div>
    <div class="whitespace-pre-line mt-4">{{ content.text }}</div>
  </article>
</template>

<script>
import { $vfm } from 'vue-final-modal'
import PostReplyDialog from '~/components/modules/posts/components/PostReplyDialog'

export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  setup() {
    const onClick = () => {
      $vfm.show({
        component: PostReplyDialog
      })
    }

    return {
      onClick
    }
  }
}
</script>