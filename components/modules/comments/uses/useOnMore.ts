import { COMMENT } from '~/components/modules/comments/graphql'
import { useFetch } from '#imports'

export const useOnMore = async (store: any): Promise<[]> => {
  const { data: { comments } } = await useFetch({
    query: `
      query ($post_id: Int, $offset: Int) {
        comments(post_id: $post_id, offset: $offset) {
          ${COMMENT}
        }
      }
    `,
    variables: {
      post_id: store.post_id,
      offset: 0
    }
  })

  return comments
}