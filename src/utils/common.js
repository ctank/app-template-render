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

/**
 * [validEnglish 验证是否是英文]
 * @param {[String]} [value] [需要验证的值]
 * @return {[Boolean]} [验证结果]
 */
export const validEnglish = (value) => {
  if (value) {
    return value.replace(/^([^\u4e00-\u9fa50-9])*/g, '') === ''
  }
  return true
}

/**
 * [validNumberOrEnglish 验证是否是数字或英文]
 * @param {[String]} [value] [需要验证的值]
 * @return {[Boolean]} [验证结果]
 */
export const validNumberOrEnglish = (value) => {
  if (value) {
    // return !/[^a-zA-Z0-9]/g.test(value)
    return value.replace(/^([^\u4e00-\u9fa5])*/g, '') === ''
  }
  return true
}
/**
 * [validEmail 验证是否是邮箱格式]
 * @param {[String]} [value] [需要验证的值]
 * @return {[Boolean]} [验证结果]
 */
export const validEmail = (value) => {
  if (value) {
    return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g.test(value)
  }
  return true
}
/**
 * [validIdCard 验证是否是身份证格式]
 * @param {[String]} [value] [需要验证的值]
 * @return {[Boolean]} [验证结果]
 */
export const validIdCard = (value) => {
  if (value) {
    return (
      /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/g.test(
        value
      ) || /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/g.test(value)
    )
  }
  return true
}

/**
 * [validPhone 验证是否是手机号码]
 * @param {[String]} [value] [需要验证的值]
 * @return {[Boolean]} [验证结果]
 */
export const validPhone = (value) => {
  if (value) {
    return /^1[3-9]\d{9}$/.test(value)
  }
  return true
}
/**
 * [validBankAccount 验证是否是银行卡号码]
 * @param {[String]} [value] [需要验证的值]
 * @return {[Boolean]} [验证结果]
 */
export const validBankAccount = (value) => {
  // // code
  // const getBankCardCheckCode = code => {
  //   if (
  //     code == null ||
  //     code.replace(/(^\s*)|(\s*$)/g, '').length == 0 ||
  //     !/\d+/.test(code)
  //   ) {
  //     return 'N'
  //   }

  //   const newArr = code.replace(/(^\s*)|(\s*$)/g, '').split('')
  //   newArr.reverse()

  //   var arrJiShu = []
  //   var arrJiShu2 = []

  //   var arrOuShu = []
  //   for (var j = 0; j < newArr.length; j++) {
  //     if ((j + 1) % 2 === 1) {
  //       if (parseInt(newArr[j]) * 2 < 9) {
  //         arrJiShu.push(parseInt(newArr[j]) * 2)
  //       } else {
  //         arrJiShu2.push(parseInt(newArr[j]) * 2)
  //       }
  //     } else {
  //       arrOuShu.push(newArr[j])
  //     }
  //   }

  //   var jishu_child1 = []
  //   var jishu_child2 = []
  //   for (var h = 0; h < arrJiShu2.length; h++) {
  //     jishu_child1.push(parseInt(arrJiShu2[h]) % 10)
  //     jishu_child2.push(parseInt(arrJiShu2[h]) / 10)
  //   }

  //   var sumJiShu = 0
  //   var sumOuShu = 0
  //   var sumJiShuChild1 = 0
  //   var sumJiShuChild2 = 0
  //   var sumTotal = 0
  //   for (var m = 0; m < arrJiShu.length; m++) {
  //     sumJiShu = sumJiShu + parseInt(arrJiShu[m])
  //   }

  //   for (var n = 0; n < arrOuShu.length; n++) {
  //     sumOuShu = sumOuShu + parseInt(arrOuShu[n])
  //   }

  //   for (var p = 0; p < jishu_child1.length; p++) {
  //     sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p])
  //     sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p])
  //   }
  //   sumTotal =
  //     parseInt(sumJiShu) +
  //     parseInt(sumOuShu) +
  //     parseInt(sumJiShuChild1) +
  //     parseInt(sumJiShuChild2)

  //   return 10 - (parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10)
  // }

  // if (value.length < 15 || value.length > 19) {
  //   return false
  // }
  // const bit = getBankCardCheckCode(value.substr(0, value.length - 1))
  // if (bit === 'N') {
  //   return false
  // }
  // return parseInt(value.charAt(value.length - 1)) === bit
  // TODO: 不确定以上算法是否准确，目前验证位数不对，先以位数来校验，后续精确匹配 by lijiacheng
  if (value) {
    return /^(\d{13,19})$/.test(value)
  }
  return true
}
/**
 * [validInteger 验证是否是整数]
 * @param {[String]} [value] [需要验证的值]
 * @return {[Boolean]} [验证结果]
 */
export const validInteger = (value) => {
  if (value) {
    return /^[-]{0,1}\d+$/.test(value)
  }
  return true
}

/**
 * [validFloat 验证是否是小数]
 * @param {[String]} [value] [需要验证的值]
 * @param {[Number]} [decimal] [小数位]
 * @return {[Boolean]} [验证结果]
 */
export const validFloat = (value, decimal = '') => {
  // console.log(value)
  // console.log(decimal)
  let regexp = ''
  let pattern = ''
  if (decimal !== '') {
    pattern = `^[-]{0,1}\\d+\\.\\d{${decimal}}$`
    // regexp = new RegExp(`^[-]{0,1}\\d+\\.\\d{${decimal}}$`)
  } else {
    pattern = '^[-]{0,1}\\d+\\.\\d+$'
    // regexp = new RegExp(`^[-]{0,1}\\d+\\.\\d+$`)
  }
  regexp = new RegExp(pattern)
  if (value) {
    return regexp.test(value)
  }
  return true
}
