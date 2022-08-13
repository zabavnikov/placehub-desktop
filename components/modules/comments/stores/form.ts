import { defineStore } from 'pinia'

export const useCommentFormStore = defineStore('comment-form', {
  state: () => {
    return {
      model_type: '',
      model_id:   null,
      parent_id:  null,
      text:       '',
    }
  }
})