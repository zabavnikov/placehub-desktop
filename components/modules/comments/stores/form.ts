import { defineStore } from 'pinia'

export const useCommentFormStore = defineStore('comment-form', {
  state: () => {
    return {
      text: '',
    }
  }
})