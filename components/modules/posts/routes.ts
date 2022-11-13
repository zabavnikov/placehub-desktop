export default [
  { path: '/posts', name: 'posts', file: 'index'},
  { path: '/posts/:postId(\\d+)', name: 'posts.show', file: 'show' },
  { path: '/posts/:postId(\\d+)/edit', name: 'posts.edit', file: 'form' },
]