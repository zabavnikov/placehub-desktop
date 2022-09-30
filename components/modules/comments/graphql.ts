export const COMMENT = `
  id
  user_id
  model_id
  model_type
  branch_id
  parent_id
  text
  created_at(relative: true)
  branch_replies_count
  likes_count
  votes_count
  votes_up_count
  votes_down_count
  parent(with_trashed: true) {
    user_id
    created_at(relative: true)
    text
    user {
      name
      avatar
    }
  }
  user {
    id
    name
    avatar
  }
  replies(with_trashed: true) {
    id
    user_id
    branch_id
    parent_id
    model_id
    model_type
    text
    likes_count
    created_at(relative: true)
    parent(with_trashed: true) {
      user_id
      created_at(relative: true)
      text
      user {
        name
        avatar
      }
    }
    user {
      id
      name
      avatar
    }
  }
`;

export const REPLY = `
  id
  user_id
  model_id
  model_type
  branch_id
  parent_id
  text
  likes_count
  created_at(relative: true)
  parent(with_trashed: true) {
    user_id
    created_at(relative: true)
    text
    user {
      name
      avatar
    }
  }
  user {
    id
    name
    avatar
  }
`;

export const CREATE_COMMENT = `
  mutation($input: CommentInput!) {
    commentData: createComment(input: $input) {
      ${COMMENT}
    }
  }
`

export const UPDATE_COMMENT = `
  mutation($id: Int!, $input: CommentInput!) {
    commentData: updateComment(id: $id, input: $input) {
      ${COMMENT}
    }
  }
`

export const DELETE_COMMENT = `
  mutation($id: Int!) {
    commentData: deleteComment(id: $id) {
      ${COMMENT}
    }
  }
`