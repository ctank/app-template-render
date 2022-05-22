import { createRouter, createWebHashHistory } from 'vue-router'
import index from './index/index' // 引用首页模块路由数组对象

const hash = createWebHashHistory()

const MainComponent = () => import('@/views/main/index')

// 定义子路由模块集合
const childrenRouter = [
  {
    path: '/',
    name: 'index',
    component: MainComponent,
    children: [...index]
  }
]

const router = createRouter({
  history: hash,
  routes: childrenRouter
})

// 全局路由钩子函数 对全局有效
router.beforeEach((to, from, next) => {
  // const auth = to.meta.auth
  // const name = store.state.global.name
  // if (auth && !name) {
  //   // 需要登录
  //   next({
  //     path: '/login',
  //     query: {
  //       fullPath: to.fullPath
  //     }
  //   })
  // } else {
  next()
  // }
})
export default router
