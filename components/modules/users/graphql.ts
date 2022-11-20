export const USER_FIELDS = `
  id
  name
  description
  avatar
  cover
`;

export const USER_FORM_FIELD = `
  id
  name
  description
`;

export const REGISTER_USER = `
  registerUser(
    name:                 $name,
    email:                $email,
    password:             $password,
    passwordConfirmation: $passwordConfirmation
  )
`;

export const USER = `
  user(id: $userId) {
    ${USER_FIELDS}
  }
`;

export const UPDATE_USER = `
  mutation updateUser ($id: Int!, $input: UserInput!) {
    updateUser(id: $id, input: $input)
  }
`