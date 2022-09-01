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

export const isNull = (val) => {
  return Object.prototype.toString.call(val) === '[object Null]'
}

export const isUndefined = (val) => {
  return Object.prototype.toString.call(val) === '[object Undefined]'
}

export const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isValueEqual = (a, b) => {
  // 判断两个对象是否指向同一内存 或 都不存在
  if (a === b || (!a && !b && a !== 0 && b !== 0)) {
    return true
  }

  // 不为对象时直接转字符串判断是否相同
  const aType = typeof a
  const bType = typeof b
  if (aType !== 'object ' && bType !== 'object ') {
    return a + '' === b + ''
  }

  if (isObject(a) && isObject(b)) {
    // 获取两个对象键值数组
    const aProps = Object.getOwnPropertyNames(a)
    const bProps = Object.getOwnPropertyNames(b)
    // 判断两个对象键值数组长度是否一致，不一致返回 false
    if (aProps.length !== bProps.length) return false // 遍历对象的键值
    for (const prop in a) {
      // 判断 a 的键值，在 b 中是否存在，不存在，返回 false
      if (b.hasOwnProperty(prop)) {
        // 判断 a 的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回 false
        if (typeof a[prop] === 'object') {
          if (!isValueEqual(a[prop], b[prop])) return false
        } else if (a[prop] !== b[prop]) {
          return false
        }
      } else {
        return false
      }
    }
    return true
  } else if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false
    }
    let isSame = true
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        if (!isValueEqual(a[i], b[j])) {
          isSame = false
          break
        }
      }
      if (!isSame) {
        break
      }
    }
    return isSame
  } else {
    return false
  }
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
  return value || ''
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

export const getComponentMap = (layouts, components) => {
  const obj = {}
  if (Array.isArray(components)) {
    components.forEach((item) => {
      if (!obj[item.id]) {
        obj[item.id] = item
      }
    })
  }
  if (Array.isArray(layouts)) {
    layouts.forEach((layout) => {
      if (!obj[layout.id]) {
        obj[layout.id] = layout
      }
    })
  }
  return obj
}

export const getComponentStatus = (componentConfig, data, componentMap) => {
  let status = true
  if (Array.isArray(componentConfig) && componentConfig.length) {
    status = false
    for (let i = 0; i < componentConfig.length; i += 1) {
      let andStatus = true
      if (!status && Array.isArray(componentConfig[i]) && componentConfig[i].length) {
        for (let j = 0; j < componentConfig[i].length; j += 1) {
          if (andStatus) {
            const { field, value, logic, type } = componentConfig[i][j]
            let fieldPath = ''
            if (type === 'custom') {
              fieldPath = field
            } else {
              if (componentMap && componentMap[field]) {
                fieldPath = componentMap[field].fieldPath
              } else {
                fieldPath = field
              }
            }

            const targetValue = getValueByPath(data, fieldPath)

            switch (logic) {
              case '0':
                if (!isValueEqual(targetValue, value)) {
                  andStatus = true
                } else {
                  andStatus = false
                }
                break
              case '1':
                if (isValueEqual(targetValue, value)) {
                  andStatus = true
                } else {
                  andStatus = false
                }
                break
            }
          }
        }
      }
      status = andStatus
    }
  }
  return status
}

/**
 * validEnglish 验证是否是英文
 * @param {String} value 需要验证的值
 * @return {Boolean} 验证结果
 */
export const validEnglish = (value) => {
  if (value) {
    return value.replace(/^([^\u4e00-\u9fa50-9])*/g, '') === ''
  }
  return true
}

/**
 * validNumberOrEnglish 验证是否是数字或英文
 * @param {String} value 需要验证的值
 * @return {Boolean} 验证结果
 */
export const validNumberOrEnglish = (value) => {
  if (value) {
    // return !/[^a-zA-Z0-9]/g.test(value)
    return value.replace(/^([^\u4e00-\u9fa5])*/g, '') === ''
  }
  return true
}
/**
 * validEmail 验证是否是邮箱格式
 * @param {String} value 需要验证的值
 * @return {Boolean} 验证结果
 */
export const validEmail = (value) => {
  if (value) {
    return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g.test(value)
  }
  return true
}
/**
 * validIdCard 验证是否是身份证格式
 * @param {String} value 需要验证的值
 * @return {Boolean} 验证结果
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
 * validPhone 验证是否是手机号码
 * @param {String} value 需要验证的值
 * @return {Boolean} 验证结果
 */
export const validPhone = (value) => {
  if (value) {
    return /^1[3-9]\d{9}$/.test(value)
  }
  return true
}
/**
 * validInteger 验证是否是整数
 * @param {String} value 需要验证的值
 * @return {Boolean} 验证结果
 */
export const validInteger = (value) => {
  if (value) {
    return /^[-]{0,1}\d+$/.test(value)
  }
  return true
}

/**
 * validFloat 验证是否是小数
 * @param {String} value 需要验证的值
 * @param {Number} decimal 小数位
 * @return {Boolean} 验证结果
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

/**
 * 复制单行内容到粘贴板
 * @param {String | Array} content 需要复制的内容
 * @param {Function} cb 复制完后的回调，不传则默认提示"复制成功"
 */
export const copyToClip = (contents, cb) => {
  let value = ''
  if (Array.isArray(contents)) {
    for (var i = 0; i < contents.length; i++) {
      value += contents[i] + '\n'
    }
  } else {
    value = contents
  }

  // navigator clipboard 需要https等安全上下文
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard 向剪贴板写文本
    navigator.clipboard.writeText(value).then(() => {
      cb(true)
    })
  } else {
    const textarea = document.createElement('textarea')
    textarea.value = value
    document.body.appendChild(textarea)
    textarea.select()
    if (document.execCommand('copy')) {
      document.execCommand('copy')
    }
    document.body.removeChild(textarea)
    cb(true)
  }
}
