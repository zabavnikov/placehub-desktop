export const COMMENT = `
  id
  user_id
  model_id
  model_type
  branch_id
  text
  created_at(relative: true)
  branch_replies_count
  like {
    is_liked
  }
  parent {
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
  replies {
    id
    user_id
    branch_id
    parent_id
    model_id
    model_type
    text
    created_at(relative: true)
    parent {
      user_id
      created_at(relative: true)
      text
      user {
        name
        avatar
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

export const REPLY = `
  id
  user_id
  model_id
  model_type
  branch_id
  text
  created_at(relative: true)
  like {
    is_liked
  }
  parent {
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