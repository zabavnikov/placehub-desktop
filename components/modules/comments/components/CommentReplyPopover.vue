<template>
  <Popover class="relative">
    <PopoverButton><slot name="button"></slot></PopoverButton>

    <PopoverPanel class="absolute z-10 w-screen max-w-sm">
      <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black bg-white p-4 ring-opacity-5">
        <header class="flex items-center">
          <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}" class="mr-3 flex-shrink-0">
            <img :src="comment.user.avatar" :alt="comment.user.name" class="w-8 h-8 bg-gray-300/50 rounded-full block">
          </nuxt-link>
          <div>
            <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}" class="underline">
              {{ comment.user.name }}
            </nuxt-link>
            <div class="text-xs text-gray-500">{{ comment.created_at }}</div>
          </div>
        </header>
        <p class="leading-relaxed font-semibold text-gray-900 mt-2" @click="onScroll">
          {{ comment.text }}
        </p>
      </div>
    </PopoverPanel>
  </Popover>
</template>

<script setup>
import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/vue'

const { comment } = defineProps({
  comment: {
    type:     Object,
    required: true,
  }
})

const onScroll = () => {
  const target = document.querySelector(`#comment-${comment.id}`)

  window.scrollTo({
    top:      target.offsetTop,
    behavior: 'smooth',
  })

  target.classList.add('bg-amber-100')

  setTimeout(() => target.classList.remove('bg-amber-100'), 2000)
}
</script>