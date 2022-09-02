import { USER_FIELDS } from '~/components/modules/users/graphql';

export const POST = `
  post(id: $postId) {
    id
    user_id
    place_id
    text
    can
    likesCount
    created_at(relative: true)
    hashtags
    images(sizes: "default@resize:auto:640:480") {
      id
      url
      sizes
    }
    like {
      is_liked
    }
    user {
      ${USER_FIELDS}
    }
  }
`;

export const POST_CARD_FRAGMENT = `
  id
  user_id
  place_id
  text(words: 24)
  likesCount
  hashtags
  can
  created_at(relative: true)
  images(sizes: "default@resize:auto:640:480") {
    id
    url
    sizes
  }
  like {
    is_liked
  }
  user {
    ${USER_FIELDS}
  }
`;

export const POST_FRAGMENT = `
  id
  user_id
  place_id
  text
  likesCount
  hashtags
  can
  created_at(relative: true)
  images(sizes: "default@resize:auto:640:480") {
    id
    url
    sizes
  }
  like {
    is_liked
  }
  user {
    ${USER_FIELDS}
  }
`;

export const POST_FORM = `
  post(id: $postId) {
    id
    user_id
    place_id
    text(raw: true)
    can
    images(sizes: "default@resize:auto:120:120") {
      id
      url
      sizes
    }
  }
`;

export const GET_POSTS = `
  posts(userId: $userId) {
    ${POST_CARD_FRAGMENT}
  }
`;

// Mutations
export const CREATE_POST = `
  mutation($input: PostInput!) {
    post: createPost(input: $input) {
    ${POST_FRAGMENT}
    }
  }
`;

export const UPDATE_POST = `
  mutation($id: Int!, $input: PostInput!) {
    post: updatePost(id: $id, input: $input) {
      text
      hashtags
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