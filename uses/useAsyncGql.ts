import { useFetch, useRoute } from '#app'

export default async (query, variables) => await useFetch(
  'http://localhost/graphql',
  {
    body: {
      query: query
          .trim()
          .replaceAll(/\s+/ig, ' '),
      variables
    },
    transform: data => data.data,
    method: 'POST',
    key: useRoute().fullPath
  }
)