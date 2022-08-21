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
  },
  actions: {
    /**
     * @param id
     * @param model_type
     * @param model_id
     */
    async toggle({ id, model_type, model_id }) {
      this.$reset()
      this.form.parent_id   = id;
      this.form.model_type  = model_type
      this.form.model_id    = model_id
    },
  },
})