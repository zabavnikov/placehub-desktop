import { useNuxtApp, useFetch } from 'nuxt/app'

export default async ({ query, variables }, options = {}) => {
  const { $auth, $config } = useNuxtApp()

  const { data, refresh, pending } = await useFetch($config.public.GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Accept:        'application/json',
      Authorization: $auth.strategy.token.get()
    },
    body: {
      query: query
          .trim()
          .replaceAll(/\s+/ig, ' '),
      variables
    }, ...options
  })

  if (Object.hasOwn(data.value, 'errors')) {
    throw data.value.errors
  }

  return {
    ...data.value,
    refresh,
    pending
  }
}