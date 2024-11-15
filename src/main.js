import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/mock'
import request from '@/utils/request'
import '@/styles/index.scss' //重置样式
import i18n from '@/lang'
import Lang from '@/components/Lang'
import * as echarts from 'echarts'
import moment from 'moment'
import dataV from '@jiaminghi/data-view'

Vue.component('Lang', Lang)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts

import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs

import $ from 'jquery'
window.jQuery = $
window.$ = $

import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
Vue.use(Avue)

Vue.directive('loadmore', {
  bind(el, binding) {
    const dom = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    dom.addEventListener('scroll', function () {
      const condition = this.scrollHeight - this.scrollTop - 0.5 <= this.clientHeight
      if (condition) {
        binding.value()
        console.log('需要20条才到底啊，通过调整上面差值来控制多少去请求')
      } else {
        console.log('滚动到底了')
      }
    })
  },
})

Vue.use(dataV)
// 全局前置守卫
// router.beforeEach(function (to, from, next) {
//   if (to.path === '/home' || to.path === '/index' || to.path === '/user') {
//     const token = sessionStorage.getItem('token')

//     if (token !== null) {
//       console.log('全局前置守卫启动，token有值放行！')
//       next()
//     } else {
//       Vue.prototype.notifyError('请先登录！')
//     }
//   } else {
//     next()
//   }
// })
Vue.prototype.request = request
Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
