import { defineStore } from 'pinia'

export const useCommentsStore = defineStore('comments', {
  state: () => {
    return {
      form: {
        model_type: '',
        model_id:   null,
        parent_id:  null,
        text:       '',
      }
    }
  }
})