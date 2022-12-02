<template>
  <TheLayout>
    <ul class="space-y-2">
      <li v-for="user in users" :key="user.id" class="flex items-center space-x-2 p-4 hover:bg-blue-50">
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
import { useFetch } from '#imports'
import { shallowRef } from 'vue'

const query = `
  query getUsers {
    users {
      ${USER_FIELDS}
    }
  }
`

const users = shallowRef([])

try {
  const { data } = await useFetch({
    query
  })

  users.value = data.users
} catch (error) {}
</script>

