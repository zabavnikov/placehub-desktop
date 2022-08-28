export const CREATE_LIKE = `
  mutation($modelType: String!, $modelId: Int!) {
    like: createLike(modelType: $modelType, modelId: $modelId)
  }
`

export const DELETE_LIKE = `
  mutation($modelType: String!, $modelId: Int!) {
    like: deleteLike(modelType: $modelType, modelId: $modelId)
  }
`