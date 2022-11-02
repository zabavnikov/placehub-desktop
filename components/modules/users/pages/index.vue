<template>
  <TheLayout>
    <ul class="space-y-2">
      <li v-for="user in data.users" :key="user.id" class="flex items-center space-x-2">
        <Profile :profile="user">
          <template #footer>
            Подписаться
          </template>
        </Profile>
      </li>
    </ul>
  </TheLayout>
</template>

<script lang="ts" setup>
import Profile from '~/components/modules/users/components/Profile'
import TheLayout from '~/components/layout/TheLayout'
import { USER_FIELDS } from '~/components/modules/users/graphql'
import { gql, useAsyncQuery } from '#imports'

const query = gql`
  query getUsers {
    users {
      ${USER_FIELDS}
    }
  }
`

const { data } = await useAsyncQuery(query)
</script>

