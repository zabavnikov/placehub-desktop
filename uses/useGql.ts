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
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'POST'
  }
)