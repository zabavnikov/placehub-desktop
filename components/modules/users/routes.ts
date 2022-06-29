export default [
  { path: '/login', name: 'users.login', file: 'login'},
  { path: '/users/:userId(\\d+)',  name: 'users.show', file: 'show' }
]