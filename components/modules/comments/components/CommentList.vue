<template>
  <section>
    <header>
<!--      <h2 class="text-xl mb-4">Комментарии<span v-if="count > 0"> ({{ count }})</span></h2>-->
      <CommentForm @created="store.list.unshift($event) "/>
    </header>

    <div class="divide-y divide-gray-100">
      <div v-for="comment in store.list" :key="comment.id">
        <Comment class="p-4" :comment="comment" @toggle-replies="onMore(comment)" />

        <!-- Replies -->
        <div v-if="comment.replies.length">
          <div class="replies divide-y divide-gray-100">
            <TransitionGroup name="list">
              <div v-for="reply in comment.replies" :key="reply.id" class="py-4 pr-4 first:-mt-4 pl-12" :id="`comment-${reply.id}`">
                <Comment :comment="reply" />
              </div>
            </TransitionGroup>
          </div>
          <div v-if="
          comment.branch_replies_count > comment.replies.length && !noMoreReplies[comment.id]" class=" px-4 mb-4">
            <Button
                variant="secondary"
                class="w-full"
                :disabled="loading"
                @click="onMore(comment)"
            >Показать еще {{ comment.branch_replies_count - comment.replies.length }}</Button>
          </div>
        </div>
      </div>
    </div>

    <Button
      v-if="hasMoreComments"
      variant="secondary"
      class="w-full"
      :disabled="loading"
      @click="onMore"
    >Показать еще</Button>
  </section>
</template>

<script setup>
import Comment from '~/components/modules/comments/components/Comment.vue'
import CommentForm from '~/components/modules/comments/components/CommentForm.vue'
import { Button } from '@placehub/ui'
import { COMMENT, REPLY } from '~/components/modules/comments/graphql'
import { ref } from 'vue'
import { sortBy, uniqBy } from 'lodash-es'
import { useCommentsStore } from '~/components/modules/comments/store.ts'
import { useFetch } from '#imports'

const store = useCommentsStore()

const props = defineProps({
  count: {
    type: Number,
    default: 0,
  }
})

const loading = ref(false)

/*
  pagePerParent: {
    parentId: pageNumber
  }
 */
const pages = ref({
  page: 1,
  pagePerParent: {},
})

const hasMoreComments = ref(props.count > store.list.length)
const noMoreReplies = ref({})

const onMore = async (parentComment = null) => {
  const isLoadingReplies = parentComment?.id > 0

  const variables = {
    post_id: store.post_id,
  }

  if (isLoadingReplies) {
    variables.branch_id = parentComment.id

    if (! Object.hasOwn(pages.value.pagePerParent, parentComment.id)) {
      pages.value.pagePerParent[parentComment.id] = 1
    }

    variables.page = pages.value.pagePerParent[parentComment.id]++
  } else {
    variables.page = pages.value.page += 1
  }

  const { data: { comments } } = await useFetch({
    query: `
      query ($post_id: Int, $branch_id: Int, $page: Int) {
        comments(post_id: $post_id, branch_id: $branch_id, page: $page) {
          ${isLoadingReplies ? REPLY : COMMENT}
        }
      }
    `,
    variables
  })

  if (comments.length) {
    if (isLoadingReplies) {
      comments.forEach((comment) => parentComment.replies.push(comment))
      parentComment.replies = uniqBy(sortBy(parentComment.replies, 'id'), 'id')
    } else {
      comments.forEach((comment) => store.list.push(comment))
    }
  } else {
    if (isLoadingReplies) {
      noMoreReplies.value[parentComment.id] = true
    } else {
      hasMoreComments.value = false
    }
  }
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: background-color 2s ease;
}
.list-enter-from,
.list-leave-to {
  @apply bg-amber-100;
}
</style>