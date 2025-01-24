import { getStore, setStore } from '@/utils/store'
import { getPersonInfo } from '@/api/login'
export default {
  namespaced: true, //user/GetUserInfo去调用
  state: {
    id: 0,
    name: '',
    userInfo: getStore({ name: 'userInfo' }) || [],
  },
  mutations: {
    updateId(state, id) {
      state.id = id
    },
    updateName(state, name) {
      state.name = name
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      setStore({ name: 'userInfo', content: state.userInfo })
    },
  },
  actions: {
    GetUserInfo({ commit }, obj) {
      return new Promise((resolve, reject) => {
        getPersonInfo(obj)
          .then(({ data }) => {
            if (data && data.code === 0) {
              commit('SET_USERINFO', JSON.stringify(data.user))
            }
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
}
