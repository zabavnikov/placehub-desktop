export const COMMENT = `
  id
  user_id
  model_id
  model_type
  branch_id
  text
  created_at(relative: true)
  replies_count(declination: ["ответ", "ответа", "ответов"])
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
    replies_count(declination: ["ответ", "ответа", "ответов"])
    created_at(relative: true)
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