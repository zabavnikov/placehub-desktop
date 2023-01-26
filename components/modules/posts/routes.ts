export default [
  { path: '/posts', name: 'posts', file: 'index'},
  { path: '/posts/create', name: 'posts.create', file: 'form' },
  { path: '/posts/:postId(\\d+)', name: 'posts.show', file: 'show' },
  { path: '/posts/:postId(\\d+)/edit', name: 'posts.edit', file: 'form' },
]