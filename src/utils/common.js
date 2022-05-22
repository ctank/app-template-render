/**
 * 获取唯一值
 * @param {String} str 用于生成唯一值的字符串
 * @return {String} 唯一值
 */
export function getOnlyKey(str = 'key') {
  return `${str}_${new Date().getTime()}_${parseInt(Math.random() * Math.random() * 1000000)}`
}

/**
 * 深拷贝
 * @param  {Object|Array} obj 需要深拷贝的对象
 * @return {Object|Array}     深拷贝出来的对象
 */
export function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 序列化对象
 * @param {Object} obj
 */
export function serialize(obj) {
  let param = '?'
  let index = 0
  for (const key in obj) {
    if (index > 0) {
      param = param + '&'
    }
    param = param + key + '=' + (obj[key] ? obj[key] : '')
    index++
  }
  return param
}

export function getModuleFolder(data) {
  const vm = data && data.vm ? data.vm : null
  const currentRoute = data && data.currentRoute ? data.currentRoute : null
  let dir = ''
  let isIndex = false
  if (vm && vm.$route && vm.$route.meta && vm.$route.meta.moduleName === 'index') {
    isIndex = true
  } else if (currentRoute && currentRoute.meta && currentRoute.meta.moduleName === 'index') {
    isIndex = true
  }
  const pathname = window.location.pathname
  const pathnameArr = pathname ? pathname.split('/') : []
  if (!isIndex) {
    pathnameArr.length = pathnameArr.length - 2
  }
  if (pathnameArr.length > 0) {
    dir = '/'
    pathnameArr.forEach((str, index) => {
      if (str) {
        dir += `${str}/`
      }
    })
    dir = dir.substr(0, dir.length - 1)
  }
  return dir || ''
}

/**
 * 页面跳转
 * @param {Object} data 路由数据 mode:'spa' 当前页面跳转 mode:'mpa' 跨页面跳转
 * @param {Boolean} replace 是否替换页面
 */
export function routerPush(data, replace) {
  if (data.mode === 'spa' && data.vm) {
    const routerParams = {
      name: data.name || '',
      params: data.params || {},
      query: data.query || {},
      path: data.path || ''
    }
    if (replace) {
      data.vm.$router.replace(routerParams)
    } else {
      data.vm.$router.push(routerParams)
    }
  } else if (data.mode === 'mpa') {
    const dir = getModuleFolder({ vm: data.vm, currentRoute: data.currentRoute })
    let targetUrl =
      window.location.origin +
      dir +
      (data.pageName ? `/${data.pageName}` : '/') +
      (window.location.search ? `/${window.location.search}` : '/')
    if (data.path) {
      targetUrl += '#/' + data.path
    }
    if (data.query) {
      targetUrl += serialize(data.query)
    }

    if (replace) {
      history.replaceState(null, '', targetUrl)
      window.location.reload()
    } else {
      window.location.href = targetUrl
    }
  }
}

/**
 * 新窗口打开页面
 * @param {Object} data
 */
export function openUrl(data) {
  const dir = getModuleFolder({ vm: data.vm })
  let targetUrl =
    window.location.origin +
    dir +
    (data.pageName ? `/${data.pageName}` : '/') +
    (window.location.search ? `/${window.location.search}` : '/')
  if (data.path) {
    targetUrl += '#/' + data.path
  }
  if (data.query) {
    targetUrl += serialize(data.query)
  }
  window.open(targetUrl)
}

/**
 * 缓存记录
 * @param {String} func 标题
 * @param {String} msg 消息
 * @param {Any} extras 数据
 */
export function setLog(func, msg, extras) {
  if (!localStorage.getItem('__isLogOn')) {
    return
  }
  let log = localStorage.getItem('__log')
  if (log) {
    try {
      log = JSON.parse(log) || []
    } catch (ex) {
      log = []
    }
  } else {
    log = []
  }
  if (log.length >= 10) {
    // 只保留10条记录
    log.splice(0, log.length - 10)
  }
  log.push({
    func,
    msg,
    extras
  })
  localStorage.setItem('__log', JSON.stringify(log))
}

/**
 * 防抖
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
 * @return {Function}     返回一个“去弹跳”了的函数
 */
export function debounce(fn, delay) {
  // 定时器，用来 setTimeout
  let timer
  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = this
    const args = arguments
    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

export const clearCache = () => {
  localStorage.clear()
  const keys = document.cookie.match(/[^ =;]+(?==)/g)
  if (keys) {
    for (let i = keys.length; i--;) {
      // 清除当前域名下的,例如：m.ratingdog.cn
      document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString()
      // 清除当前域名下的，例如 .m.ratingdog.cn
      document.cookie =
        keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString()
      // 清除一级域名下的或指定的，例如 .ratingdog.cn
      document.cookie =
        keys[i] + '=0;path=/;domain=ratingdog.cn;expires=' + new Date(0).toUTCString()
    }
  }
}

export const isNull = (val) => {
  return Object.prototype.toString.call(val) === '[object Null]'
}

export const isUndefined = (val) => {
  return Object.prototype.toString.call(val) === '[object Undefined]'
}

export const getValueByPath = (data, path) => {
  let value = ''
  if (data && path) {
    const paths = path.split('/')
    for (let i = 0; i < paths.length; i++) {
      if (value && !isNull(value[paths[i]]) && !isUndefined(value[paths[i]])) {
        value = value[paths[i]]
      } else {
        value = data[paths[i]]
      }
    }
  }
  return value
}

export const setValueByPath = (data, path, val) => {
  if (data && path) {
    const paths = path.split('/')
    if (paths.length === 1) {
      data[paths[0]] = val
    } else {
      let valueObj = null
      for (let i = 0; i < paths.length; i++) {
        if (i === paths.length - 1) {
          if (valueObj) {
            valueObj[paths[i]] = val
          }
          break
        }
        if (valueObj && valueObj[paths[i]]) {
          valueObj = valueObj[paths[i]]
        } else {
          valueObj = data[paths[i]]
        }
      }
    }
  }
  return data
}
