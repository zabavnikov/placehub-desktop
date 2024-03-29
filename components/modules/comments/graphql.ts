export const COMMENT = `
  id
  user_id
  post_id
  branch_id
  parent_id
  text
  created_at(relative: true)
  branch_replies_count
  rating
  replies
  vote {
    type
  }
  votes_up_count
  votes_down_count
  parent(with_trashed: true) {
    id
    user_id
    created_at(relative: true)
    text
    user {
      name
      avatar
    }
  }
  can_delete
  can_update
  can_reply
  user {
    id
    name
    avatar
  }
`;

export const REPLY = `
  id
  user_id
  post_id
  branch_id
  parent_id
  text
  rating
  can_delete
  can_update
  can_reply
  vote {
    type
  }
  votes_up_count
  votes_down_count
  created_at(relative: true)
  parent(with_trashed: true) {
    id
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