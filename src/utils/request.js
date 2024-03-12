import Vue from 'vue'
import axios from 'axios'

const request = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000 * 60 * 2,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

/**
 * 请求拦截
 */
request.interceptors.request.use(
  (config) => {
    // config.headers['token'] = Vue.cookie.get('share_wiring_token') // 请求头带上token
    // config.headers['language'] = localStorage.getItem('language') // 请求头带上中英文切换
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截
 */
request.interceptors.response.use(
  (response) => {
    // if (response.data && response.data.code === 401) {
    //   // 401, token失效
    //   clearLoginInfo()
    //   router.push({ name: 'login' })
    // }
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
