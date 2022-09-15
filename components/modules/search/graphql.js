import { POST_CARD } from '~/components/modules/posts/graphql'

export const SEARCH = `
  search(query: $query) {
    ...on Post {
      ${POST_CARD}
    }
  }
`