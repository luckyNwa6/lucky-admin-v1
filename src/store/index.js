import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import user from './modules/user'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
  },
  mutations: {
    // 重置vuex本地储存状态
    resetStore(state) {
      Object.keys(state).forEach(key => {
        state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      })
      localStorage.clear()
      sessionStorage.clear()
    },
  },
  getters,
  strict: process.env.NODE_ENV !== 'production',
})
