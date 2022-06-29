import { $fetch } from 'ohmyfetch'
import { defineStore } from 'pinia'
import { useCookie } from '#app'

export const useJwt = defineStore('jwt', {
  state: () => {
    return {
      jwt: {
        user: useCookie('user').value,
      }
    }
  },
  actions: {
    login(credentials) {
      return new Promise(async (resolve, reject) => {
        try {
          const { token } = await $fetch('http://localhost/api/users/login', {
            body: credentials,
            method: 'POST'
          })

          this.me(token)
            .then((user) => {
              useCookie('token').value = token
              resolve(user)
            })

        } catch (error) {
          reject(error)
        }
      })
    },
    logout() {
      this.jwt.user = undefined
      useCookie('token').value = undefined;
      useCookie('user').value = undefined;
    },
    async me(token) {
      try {
        const user = await $fetch('http://localhost/api/users/me', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          },
          method: 'POST'
        })

        console.log(user)

        if (user) {
          useCookie('user').value = this.jwt.user = user
        }

        return user;
      } catch ({ response }) {
        if (response.status === 401) {
          this.logout()
        }
      }
    }
  },
  getters: {
    check: (state) => state.jwt.user && state.jwt.user.hasOwnProperty('id'),
    user: (state) => state.jwt.user,
  }
})