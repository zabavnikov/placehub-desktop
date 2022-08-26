export const COMMENT = `
  id
  user_id
  model_id
  model_type
  branch_id
  text
  created_at
  branch_replies_count
  like {
    is_liked
  }
  parent {
    user_id
    text
    user {
      name
    }
  }
  user {
    id
    name
    avatar
  }
  replies {
    id
    user_id
    branch_id
    parent_id
    model_id
    model_type
    text
    created_at
    parent {
      user_id
    text
      user {
        name
      }
    }
    like {
      is_liked
    }
    user {
      id
      name
      avatar
    }
  }
`;