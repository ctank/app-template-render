const router = [
  {
    path: '/',
    redirect: 'demo'
  },
  {
    path: 'demo',
    name: 'demo',
    component: () => import('../../views/index.vue'),
    meta: {
      title: 'DEMO'
    }
  }
]

export default router
