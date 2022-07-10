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

export const isValueEqual = (a, b) => {
  // 判断两个对象是否指向同一内存，指向同一内存返回 true
  if (a === b) return true // 获取两个对象键值数组
  let aProps = Object.getOwnPropertyNames(a)
  let bProps = Object.getOwnPropertyNames(b)
  // 判断两个对象键值数组长度是否一致，不一致返回 false
  if (aProps.length !== bProps.length) return false // 遍历对象的键值
  for (let prop in a) {
    // 判断 a 的键值，在 b 中是否存在，不存在，返回 false
    if (b.hasOwnProperty(prop)) {
      // 判断 a 的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回 false
      if (typeof a[prop] === 'object') {
        if (!isObjectValueEqual(a[prop], b[prop])) return false
      } else if (a[prop] !== b[prop]) {
        return false
      }
    } else {
      return false
    }
  }
  return true
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
