import { $fetch } from 'ohmyfetch'
import { useNuxtApp } from 'nuxt/app'

export default async (query, variables) => await $fetch(
  'http://127.0.0.1:8080/graphql',
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
    initialCache: false,
    method: 'POST',
    async onResponse({ response }) {
      if (response?._data?.errors) {
        return new Promise((resolve, reject) => reject(response._data.errors))
      }
    }
  }
)