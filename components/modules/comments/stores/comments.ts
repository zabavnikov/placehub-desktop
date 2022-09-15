import { defineStore } from 'pinia'
import pick from 'lodash.pick'

const form = {
  id:         null,
  model_type: '',
  model_id:   null,
  parent_id:  null,
  text:       '',
}

export const useCommentsStore = defineStore('comments', {
  state: () => {
    return {
      model_type: '',
      model_id:   null,
      list: [],
      mode: null,
      activeForm: null
    }
  },
  actions: {
    async addComment(comment: object) {
      if (comment.branch_id > 0) {
        for (let branch of this.list) {
          if (parseInt(branch.id) === comment.branch_id) {
            if (Object.hasOwn(branch, 'new_replies_count')) {
              branch.new_replies_count = 0
            }

            branch.replies.push(comment)
            branch.branch_replies_count++
            // Нужно для подгрузки новых комменатриев в ветке.
            branch.new_replies_count++
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
      this.activeForm = null
    }
  },
  getters: {
    isEdit:  (state) => state.mode === 'edit',
    isReply: (state) => state.mode === 'reply'
  },
})