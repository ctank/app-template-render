import axios from 'axios'
import router from '@/router/index.js'
import { setLog, clearCache } from '@/utils/common'
import { APP_BASE_API } from '@/utils/env'

// 创建axios实例
const service = axios.create({
  baseURL: APP_BASE_API,
  // 请求超时时间
  timeout: 200000,
  // 加了这段就可以跨域了
  withCredentials: false
})

let serviceTips = '服务器超时'

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 获取本地token
    const token = localStorage.getItem('token') || ''
    // 设置请求头
    let headers = 'application/json;charset=UTF-8'
    // 是否携带token
    let tokenFlag = true
    // 是否修改请求信息
    if (config.opts) {
      // 获取携带token状态
      tokenFlag = config.opts ? config.opts.token : true
      // 获取请求头
      headers = config.opts.Header ? config.opts.Header : 'application/json;charset=UTF-8'
      // 拓展头部参数
      const Head = config.opts.Head
      if (Head) {
        for (const key in Head) {
          config.headers[key] = Head[key]
        }
      }
    }
    if (token && tokenFlag) {
      // 条件允许，携带token请求
      config.headers.Authorization = 'Bearer ' + token
    }
    // 设置请求格式
    config.headers['Content-Type'] = headers

    if (config.method === 'get') {
      config.params = {
        ...config.params,
        // 时间戳
        timestamp: new Date().getTime()
      }
    } else if (config.method === 'post') {
      console.log('🚀------>', config.data)
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// http response 服务器响应拦截器
service.interceptors.response.use(
  (response) => {
    // 700 该账号已在其它终端登陆
    if (response.data.code === 700) {
      // 发生错误后跳转登录
      clearCache()
      router.push({ name: 'login' })
    }

    const codeString = response.data && response.data.code ? response.data.code.toString() : ''
    if (`${codeString[2]}${codeString[3]}` === '10') {
      return response
    } else {
      switch (response.data.code) {
        default:
          return response.data || null
      }
    }
  },
  (error) => {
    if (error.response) {
      // 700 该账号已在其它终端登陆
      if (error.response.data.code === 700 || error.response.data.code === 403) {
        // 发生错误后跳转登录
        clearCache()
        router.push({ name: 'login' })
      }

      try {
        setLog('HTTP请求错误', error.response.status, {
          requestUrl: error.response.config.url,
          requestToken: error.response.config.headers['X-Auth0-Token']
        })
      } catch (ex) {
        setLog('HTTP请求错误', '写入日志错误', ex)
      }
      switch (error.response.status) {
        case 400:
          error.response.data = error.response.data.message || '发生错误'
          break
        case 401:
          error.response.data = '登录超时，重新登录'
          break
        case 404:
          error.response.data = '资源不存在'
          break
        case 406:
          error.response.data = '头部无携带token'
          break
        case 412:
          error.response.data = '秘钥失效'
          break
        case 415:
          error.response.data = '请求type有误'
          break
        case 500:
          error.response.data = '服务器异常'
          break
      }
      serviceTips = error.response.data
    }
    return Promise.reject(serviceTips)
  }
)
export default service
