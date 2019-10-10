/**
 * Created by jiachenpan on 16/11/18.
 */
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/** 表单的验证 */

// 非空验证
export const validateNull = (rule, value, callback) => {
  if (!value) {
    callback(new Error('此项为必填项'))
  }
  callback()
}
// 正整数验证
export const validatePositiveInteger = (rule, value, callback) => {
  if (!/^[1-9]\d*$/.test(value)) {
    callback(new Error())
  }
  callback()
}
// 金额限制
export const validateMoney = (rule, value, callback) => {
  if (value / 10000 > 300) {
    callback(new Error())
  }
  callback()
}
// 正浮点数验证
export const validatePositiveFloat = (rule, value, callback) => {
  if (!/^[0-9]\d*\.\d*|0\.\d*[0-9]\d*$/.test(value) && !/^[0-9]\d*$/.test(value)) {
    callback(new Error())
  }
  callback()
}

// 手机号验证
export const validatePhone = (rule, value, callback) => {
  const reg = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/
  if (!reg.test(value)) {
    callback(new Error('手机号码不正确'))
  } else {
    callback()
  }
}
// 空数组验证
export const validateArray = (rule, valueArray, callback) => {
  if (valueArray && valueArray.length > 0) {
    callback()
  } else {
    callback(new Error())
  }
}

// 数组-手机验证
export const validateArrayPhone = (rule, valueArray, callback) => {
  if (valueArray && valueArray.length > 0) {
    const reg = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/
    let success = true
    let errorPhone = ''
    valueArray.forEach(item => {
      if (!reg.test(item)) {
        errorPhone += item + ','
      }
      success = success && reg.test(item)
    })
    if (!success) {
      callback(new Error(`手机号：${errorPhone}，不正确 请重新输入`))
    } else {
      callback()
    }
  } else {
    callback(new Error('请至少输入一个手机号'))
  }
}
