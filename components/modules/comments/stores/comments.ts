import { defineStore } from 'pinia'
import pick from 'lodash.pick'

const form = {
  id:         null,
  post_id:   null,
  parent_id:  null,
  text:       '',
}

export const useCommentsStore = defineStore('comments', {
  state: () => {
    return {
      post_id:   null,
      list: [],
      mode: null,
      activeForm: null
    }
  },
  actions: {
    async addComment(comment: object) {
      if (comment.branch_id > 0) {
        for (let branch of this.list) {
          if (parseInt(branch.id) === parseInt(comment.branch_id)) {
            branch.replies[comment.id] = comment
            branch.branch_replies_count++
            break
          }
        }
      } else {
        if (! comment.hasOwnProperty('replies')) {
          comment.replies = {}
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