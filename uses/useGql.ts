import { $fetch } from 'ohmyfetch'
import { useNuxtApp } from 'nuxt/app'

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
      Authorization: useNuxtApp().$auth.strategy.token.get()
    },
    method: 'POST'
  }
)