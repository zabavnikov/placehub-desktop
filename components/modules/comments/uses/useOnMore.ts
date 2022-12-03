import { COMMENT } from '~/components/modules/comments/graphql'
import { useGQL } from '~/uses'

export const useOnMore = async (post_id: number, offset: number): Promise<[]> => {
  const { data } = await useGQL(`
      query ($post_id: Int, $offset: Int) {
        comments(post_id: $post_id, offset: $offset) {
          ${COMMENT}
        }
      }
    `, {
    post_id,
    offset
  })

  return data.comments
}