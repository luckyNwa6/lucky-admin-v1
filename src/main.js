import Vue from 'vue'
import App from '@/App'
import router from '@/router' // api: https://github.com/vuejs/vue-router
import store from '@/store' // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie' // api: https://github.com/alfhen/vue-cookie
import '@/element-ui' // api: https://github.com/ElemeFE/element
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons' // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import Global from './utils/Global'
import { getDic } from '@/api/dic/index.js'
import plugins from './plugins' // plugins

Vue.use(VueCookie)
Vue.use(Global)
Vue.use(plugins)
Vue.use(window.AVUE)
const isDebug_mode = false
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

// 在应用入口文件（如 main.js）中添加以下代码
const originalWarn = console.warn

console.warn = function(message, ...args) {
  if (typeof message === 'string' && message.includes(' ')) {
    // 忽略特定的警告信息
    return
  }
  originalWarn.apply(console, [message, ...args])
}

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth // 权限方法
Vue.prototype.getDic = getDic

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)
// 防止重复点击,下面是一个自定义指令，在button中可以加入v-preventReClick生效
Vue.directive('preventReClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  },
})
const lucky = [`😳欢迎使用小维后台管理系统😳`, '  💕2024 By luckyNwa']

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
console.log(`%c  ${lucky[0]}  %c  \n${lucky[1]}`, 'color:#39c5bb', 'color:#39c5bb')
