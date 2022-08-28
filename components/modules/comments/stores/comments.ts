import { defineStore } from 'pinia'

export const useCommentsStore = defineStore('comments', {
  state: () => {
    return {
      list: [],
      // Общие поля для формы.
      // Редактируемые поля - объявляются для каждой формы локально.
      form: {
        model_type: '',
        model_id:   null,
        parent_id:  null,
      }
    }
  },
  actions: {
    async addComment(comment: object, branchId: number = 0) {
      if (branchId > 0) {
        for (let branch of this.list) {
          if (parseInt(branch.id) === branchId) {
            branch.replies.push(comment)
            branch.branch_replies_count++
            break
          }
        }
      } else {
        if (! comment.hasOwnProperty('replies')) {
          comment.replies = []
        }
        this.list.unshift(comment)
      }

      this.hideForm()
    },
    hideForm() {
      this.form.parent_id = null;
    },
    showForm(parentId: number) {
      this.form.parent_id = parentId
    }
  },
})