import md5 from 'blueimp-md5'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { isString, isObject } from 'util'

// 定义全局变量clearRequest，在route.js中要用到  路由变更时取消未完成的请求
const clearRequest = {
  source: {
    token: null,
    cancel: null
  }
}
const CancelToken = axios.CancelToken
const source = CancelToken.source()

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  withCredentials: false, // 跨域请求时不发送 cookies
  timeout: 3000 * 1000, // request timeout
  cancelToken: source.token,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // method: 'post'
})

// request interceptor
request.interceptors.request.use(config => {
  // 每个请求添加一个token  路由改变的时候 取消未完成的请求
  config.cancelToken = clearRequest.source.token
  // 判断请求
  const method = config.method === 'cus_get' ? 'get' : 'post'
  config.method = method
  // 单参数序列化
  if(config.data && !isObject(config.data)) {
    config.data = JSON.stringify(config.data)
  }
  // 添加API header
  const timestamp = new Date().getTime().toString() // 当前时间戳
  config.headers['app-id'] = process.env.VUE_APP_APP_ID // APP_ID
  config.headers['secret-id'] = process.env.VUE_APP_SECRET_ID // 安全认证标识
  config.headers['timestamp'] = timestamp // 时间戳
  config.headers['sign'] = getSign('', timestamp, method !== 'get' && config.data || '{}') // 签名
  // 如果为空data 加一个空对象
  if (!config.data) {
    config.data = '{}'
  }
  // 添加token
  const token = getToken()
  if (token) {
    config.headers['token'] = token // 请求携带自定义token
  }
  return config
}, error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
    // debugger
    const res = response.data
    if (res.code !== '0') {
      // 失败
      Message.error(`${res.code}:${res.msg}`)
      // token失效
      if (res.code === '180001') {
        MessageBox.confirm('会话已失效，请重新登录', '会话失效', {
          confirmButtonText: '重新登录',
          showCancelButton: false,
          showClose: false,
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          store.dispatch('user/FedLogOut')
          location.reload()
        })
      }
      return Promise.reject()
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    console.log('resp-error========>')
    console.dir(error)
    // 存在响应
    if (error && error.response) {
      Message.error('网络异常，请稍后重试或联系管理员')
    } else {
      // 请求超时
      if (error.code === 'ECONNABORTED') {
        Message({
          message: '请求超时',
          type: 'error',
          duration: 7 * 1000
        })
      } else {
        // Message.error(error.message)
        console.log(error.toString())
        if (error.toString() !== 'Cancel') {
          Message.error('网络异常，请稍后重试或联系管理员')
        }
      }
    }
    return Promise.reject(error)
  }
)


/**
 * 参数加签
 * @param {*} privateKey
 * @param {*} timestamp
 * @param {*} data
 */
function getSign(privateKey, timestamp, data) {
  //
  privateKey = privateKey || process.env.VUE_APP_PRIVATE_KEY
  // 非string 转换string
  if (!isString(data)) {
    data = JSON.stringify(data)
  }

  // 转换data为 string 去除\r \n 以及带长度空字符串
  data = data.replace(/[\r\n]/g, '').replace(/\s+/g, '')
  // console.log('data', data)
  let dataStrByUrl = encodeURIComponent(data).toUpperCase()
  // console.log('dataStrByUrl before', dataStrByUrl)
  dataStrByUrl = dataStrByUrl.replace(/\~/g, '%7E')
  // dataStrByUrl = dataStrByUrl.replace(/\(/g, '%28')
  // dataStrByUrl = dataStrByUrl.replace(/\)/g, '%29')
  // dataStrByUrl = dataStrByUrl.replace(/\!/g, '%21')
  // dataStrByUrl = dataStrByUrl.replace(/\'/g, '%27')
  // dataStrByUrl = dataStrByUrl.replace(/\~/g, '%7E')
  // dataStrByUrl = dataStrByUrl.replace(/\*/g, '%2A')
  // console.log('dataStrByUrl after', dataStrByUrl)
  // console.log('sign', md5(dataStrByUrl + privateKey + timestamp))
  // 加签 请求文本+私钥+时间戳+  以md5方式进行加密
  return md5(dataStrByUrl + privateKey + timestamp)
}

export {
  request,
  axios,
  clearRequest
}
