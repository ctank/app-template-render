import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import filters from './filters/index'
import initELementPlus from '@/lib/element-plus'
import '@/assets/style/style.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)
// vue3 移除了filter过滤器
// https://v3.cn.vuejs.org/guide/migration/filters.html#%E5%85%A8%E5%B1%80%E8%BF%87%E6%BB%A4%E5%99%A8
app.config.globalProperties.$filters = {
  ...filters
}

app.config.globalProperties.$App = app

initELementPlus(app)

// TODO:暂时启用devtools以便拿到keepAlive的缓存
if (!window.__VUE_PROD_DEVTOOLS__) {
  window.__VUE_PROD_DEVTOOLS__ = true
}

app.use(router).use(store).mount('#app')
