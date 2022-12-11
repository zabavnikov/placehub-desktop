import { defineStore } from 'pinia'
import pick from 'lodash/pick'
import sortBy from 'lodash/sortBy'

const initialState = {
  post_id:   null,
  list: [],
  mode: null,
  activeForm: null
}

export const useCommentsStore = defineStore('comments', {
  state: () => {
    return {...initialState}
  },
  actions: {
    reset(keys) {
      Object.assign(this, keys?.length
        ? pick(initialState, keys)
        : initialState
      );
    },

    async addComment(comment: object) {
      if (comment.branch_id > 0) {
        for (let branch of this.list) {
          if (parseInt(branch.id) === parseInt(comment.branch_id)) {
            branch.replies.push(comment)
            branch.branch_replies_count++
            break
          }
        }
      } else {
        this.list.unshift(comment)
      }

      sortBy(comment.replies, 'id')

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