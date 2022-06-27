import { $fetch } from 'ohmyfetch'

export default async (query, variables) => await $fetch(
  'http://localhost/graphql',
  {
    body: {
      query: query
          .trim()
          .replaceAll(/\s+/ig, ' '),
      variables
    },
    method: 'POST'
  }
)