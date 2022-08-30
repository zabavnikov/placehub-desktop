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
      form: {
        comment:  {...form},
        edit:     {...form},
        reply:    {...form},
      },
      mode: null,
      activeForm: null
    }
  },
  actions: {
    edit(comment: object) {
      // Берем из комментария, только те поля которые есть в form
      Object.assign(this.form.edit, pick(comment, Object.keys(form)))
      this.mode = 'edit'
    },
    async addComment(comment: object) {
      if (comment.branch_id > 0) {
        for (let branch of this.list) {
          if (parseInt(branch.id) === comment.branch_id) {
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
      this.activeForm = null
    },
    replyTo(comment: object) {
      this.form.reply.model_type  = this.model_type
      this.form.reply.model_id    = this.model_id
      this.form.reply.parent_id   = comment.id

      this.mode = 'reply'
    }
  },
  getters: {
    isEdit:  (state) => state.mode === 'edit',
    isReply: (state) => state.mode === 'reply'
  },
})