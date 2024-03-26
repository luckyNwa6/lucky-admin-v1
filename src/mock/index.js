const Mock = require('mockjs')
const mockFiles = require.context('./modules', false, /\.js$/) // 适用于Vue2
// const baseUrl = "https://localhost:8081"
let mocks = []

mockFiles.keys().forEach((key) => {
  //获取modules下的全部js
  // console.log('🚀 ~ mockFiles.keys ~ key:', key)

  mocks.push(...mockFiles(key))
})
//mock模拟里面的数据
mocks.forEach((item) => {
  // console.log('🚀 ~ mocks.forEach ~ item:', item)
  Mock.mock(item.url, item.type, item.response)
})
