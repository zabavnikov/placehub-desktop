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

<script setup>
import { useRoute } from 'nuxt/app'
import { USER_FIELDS } from '~/components/modules/users/graphql'
import { useAsyncGql } from '~/uses'
import Profile from '~/components/modules/users/components/Profile'

const route = useRoute()

const { data } = await useAsyncGql(`
  query {
    users {
      ${USER_FIELDS}
    }
  }
`, {
})
</script>

