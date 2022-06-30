<template>
  <vue-final-modal
      v-slot="{ params, close }"
      v-bind="$attrs"
      esc-to-close
      classes="dialog"
      content-class="dialog-content"
      @before-close="store.replyParent = {}"
  >
    <post-form class="rounded-lg overflow-hidden" is-reply></post-form>
  </vue-final-modal>
</template>

<script>
import { usePostsStore } from '~/stores/posts'
import PostForm from '~/components/modules/posts/components/PostForm'

export default {
  components: {
    PostForm
  },
  setup(_, { $pinia }) {
    const store = usePostsStore($pinia)

    return {
      store
    }
  }
}
</script>

<style scoped>
::v-deep(.dialog) {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
::v-deep(.dialog-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 558px;
  left: -148px;
  top: 5%;
  bottom: 5%;
  max-height: 90%;
  overflow-y: auto;
}
</style>