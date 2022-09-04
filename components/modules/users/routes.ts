export default [
  { path: '/login', name: 'users.login', file: 'login'},
  { path: '/register', name: 'users.register', file: 'register'},
  { path: '/users/:userId(\\d+)',  name: 'users.show', file: 'show' },
  { path: '/users/:userId(\\d+)/edit',  name: 'users.edit', file: 'edit' },
  { path: '/users/verify/:userId(\\d+)/:token', name: 'users.verify', file: 'verify' },
]