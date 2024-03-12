import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUIPlugin from './utils/element-ui-plugin'
import VueCookie from 'vue-cookie'
import Global from './utils/Global'
import qs from 'qs'
import ViButton from '@luckynwa-lib/vi-button'
import '@luckynwa-lib/vi-button/dist/index.css'

import $ from 'jquery'

// 引入echarts-5.0
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

//全局注册
Vue.use(ElementUIPlugin)
Vue.use(Global)
Vue.use(ViButton)
Vue.use(VueCookie)

window.$ = $
// 挂载全局
Vue.prototype.$qs = qs
// Vue.prototype.$target = "http://localhost:3737/";
Vue.config.productionTip = false //关闭生产环境下的提示信息

// 全局前置守卫
router.beforeEach(function (to, from, next) {
  if (to.path === '/home' || to.path === '/index' || to.path === '/pic') {
    const token = Vue.cookie.get('picToken')
    if (token !== null) {
      // console.log('全局前置守卫启动，token有值放行！')
      next()
    } else {
      Vue.prototype.failMsg('请先登录！')
    }
  } else {
    next()
  }
})

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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
