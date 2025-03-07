import { getStore, setStore } from '@/utils/store'
import { getPersonInfo } from '@/api/login'
import { updatePersonInfo } from '@/api/user/index.js'
export default {
  namespaced: true, //user/GetUserInfo去调用
  state: {
    id: 0,
    name: '',
    userInfo: getStore({ name: 'userInfo' }) || [],
    token: getStore({ name: 'token' }) || '',
  },
  mutations: {
    updateId(state, id) {
      state.id = id
    },
    updateName(state, name) {
      state.name = name
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = { ...userInfo }

      setStore({ name: 'userInfo', content: state.userInfo })
    },
  },
  actions: {
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getPersonInfo()
          .then(({ data }) => {
            if (data && data.code === 200) {
              commit('SET_USERINFO', data.user)
            }
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UpdateUserInfo({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        updatePersonInfo(userInfo)
          .then(response => {
            if (response.data.code === 200) {
              commit('SET_USERINFO', userInfo)
              resolve(0)
            } else {
              console.error('Update failed:')
              reject(new Error(response.data.msg))
            }
          })
          .catch(err => {
            console.error('Failed to update user info:', err)
            reject(err)
          })
      })
    },
  },
}
