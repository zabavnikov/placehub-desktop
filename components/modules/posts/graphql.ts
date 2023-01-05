import { USER_FIELDS } from '~/components/modules/users/graphql';

export const POST = `
  post(id: $postId) {
    id
    user_id
    place_id
    title
    text
    can
    likes_count
    created_at(relative: true)
    hashtags
    who_can_comment
    images(sizes: "default@resize:auto:640:480") {
      id
      url
      sizes
      aspect_ratio
    }
    like {
      is_liked
    }
    user {
      ${USER_FIELDS}
    }
    last_comments_from
    latestCommentators {
      id
      name
      avatar
    }
  }
`;

export const POST_CARD = `
  id
  user_id
  place_id
  title
  text(words: 24)
  likes_count
  hashtags
  comments_count
  likes_count
  shares_count
  image_order
  can
  created_at(relative: true)
  images(sizes: "default@resize:auto:640:480") {
    id
    url
    sizes
    aspect_ratio
  }
  like {
    is_liked
  }
  user {
    ${USER_FIELDS}
  }
  last_comments_from
  latestCommentators {
    id
    name
    avatar
  }
`;

export const POST_FRAGMENT = `
  id
  user_id
  place_id
  title
  text
  hashtags
  comments_count
  likes_count
  shares_count
  image_order
  can
  created_at(relative: true)
  who_can_comment
  images(sizes: "default@resize:auto:640:480") {
    id
    url
    sizes
    aspect_ratio
  }
  like {
    model_id
    is_liked
  }
  user {
    ${USER_FIELDS}
  }
  last_comments_from
  latestCommentators {
    id
    name
    avatar
  }
`;

export const POST_FORM = `
  id
  user_id
  place_id
  who_can_comment
  type
  text(raw: true)
  can
  place {
    id
    parent_id
    name
    full_name
    parent {
      id
      parent_id
      name
      parent {
        id
        parent_id
        name
        parent {
          id
          parent_id
          name
        }
      }
    }
  }
  images(sizes: "default@resize:auto:120:120") {
    id
    url
    sizes
  }
`;

export const GET_POSTS = `
  posts(userId: $userId) {
    ${POST_CARD}
  }
`;

// Mutations
export const CREATE_POST = `
  mutation($input: PostInput!) {
    post: createPost(input: $input) {
      ${POST_CARD}
    }
  }
`;

export const UPDATE_POST = `
  mutation($id: Int!, $input: PostInput!) {
    post: updatePost(id: $id, input: $input) {
      text
      hashtags
      images(sizes: "default@resize:auto:120:120") {
        id
        url
        sizes
      }
    }
  }
`;

//
// Replies
//
export const POST_REPLY_FRAGMENT = `
  id
  user_id
  model_id
  model_type
  text
  created_at(relative: true)
  replies_count(declination: ["ответ", "ответа", "ответов"])
  like {
    is_liked
  }
  user {
    id
    name
    avatar
  }
  replies(with_trashed: true) {
    id
    user_id
    parent_id
    model_id
    model_type
    text
    replies_count(declination: ["ответ", "ответа", "ответов"])
    created_at(relative: true)
    like {
      is_liked
    }
    user {
      id
      name
      avatar
    }
    replies(with_trashed: true) {
      id
      user_id
      parent_id
      model_id
      model_type
      text
      replies_count(declination: ["ответ", "ответа", "ответов"])
      created_at(relative: true)
      like {
        is_liked
      }
      user {
        id
        name
        avatar
      }
    }
  }
`;

export const CREATE_POST_REPLY = `
  mutation($input: PostReplyInput!) {
    postReplyForm: createPostReply(input: $input) {
      ${POST_REPLY_FRAGMENT}
    }
  }
`;

export const UPDATE_POST_REPLY = `
  mutation($id: Int!, $input: PostReplyInput!) {
    postReplyForm: updatePostReply(id: $id, input: $input)
  }
`;