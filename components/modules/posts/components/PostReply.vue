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
    <post-form v-if="replyParentId === content.id" is-reply></post-form>
    {{ replyParentId }}
  </article>
</template>

<script>
import { usePostsStore } from '~/stores/posts'
import PostForm from '~/components/modules/posts/components/PostForm'

export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  components: {
    PostForm
  },
  setup({ content }, { $pinia }) {
    const store = usePostsStore($pinia)

    const onClick = async () => {
      store.replyParentId = content.id
    }

    return {
      replyParentId: store.replyParentId,
      onClick
    }
  }
}
</script>