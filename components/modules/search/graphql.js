import { POST_CARD_FRAGMENT } from '~/components/modules/posts/graphql'

export const SEARCH = `
  search(query: $query) {
    ...on Post {
      ${POST_CARD_FRAGMENT}
    }
  }
`