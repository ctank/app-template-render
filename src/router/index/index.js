const router = [
  {
    path: '/',
    name: 'index',
    meta: {
      // 是否页签
      isTab: true,
      // 是否默认打开
      isDefault: true,
      // 是否可关闭
      isLock: true,
      title: '首页'
    },
    component: () => import('@/views/index.vue')
  },
  {
    path: '/demo',
    name: 'demo',
    meta: {
      isTab: true,
      title: 'Demo'
    },
    component: () => import('@/views/demo.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

export default router
