export default {
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,500,600&display=swap' }
      ],
    },
  },
  vite: {
    server: {
      fs: {
        allow: ['..']
      }
    }
  },
  css: [
    '@/assets/scss/main.scss'
  ],
  modules: [
    '@nuxtjs-alt/auth',
    '@nuxtjs-alt/axios',
    '@nuxtjs-alt/http',
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '~/modules/routes'
  ],
  build: {
    transpile: ['@heroicons/vue', '@placehub/ui']
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL
      }
    },
  },
  auth: {
    globalMiddleware: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.API_URL + '/api/users/login',
            method: 'post',
          },
          logout: {
            url: process.env.API_URL + '/api/users/logout',
            method: 'post'
          },
          user: {
            url: process.env.API_URL + '/api/users/me',
            method: 'get',
            propertyName: false
          }
        },
        token: {
          property: 'token',
          maxAge: 60 * 60
        },
        user: {
          property: false,
          autoFetch: true
        },
      }
    },
    redirect: {
      home: false,
    }
  },
}
