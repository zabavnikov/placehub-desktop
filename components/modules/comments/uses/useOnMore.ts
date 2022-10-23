import { COMMENT } from '~/components/modules/comments/graphql'
import { useGQL } from '~/uses'

export const useOnMore = async (model_type: string, model_id: number, offset: number): Promise<[]> => {
  const { data } = await useGQL(`
      query ($model_type: String, $model_id: Int, $offset: Int) {
        comments(model_type: $model_type, model_id: $model_id, offset: $offset) {
          ${COMMENT}
        }
      }
    `, {
    model_type,
    model_id,
    offset
  })

  return data.comments
}