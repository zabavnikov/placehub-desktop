import { useNuxtApp } from 'nuxt/app'

export default async (query, variables) => await $fetch(
  'http://localhost:8080/graphql',
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
        if (response._data.errors[0]) {
          alert(response._data.errors[0]['message'])
        }
        return new Promise((resolve, reject) => reject(response._data.errors))
      }
    }
  }
)