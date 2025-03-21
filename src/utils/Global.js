/*
 * @Author: luckyNwa
 * @Date: 2023-04-17 15:15:08
 */
exports.install = function(Vue) {
  // 封装提示成功的弹出框
  Vue.prototype.successMsg = function(msg) {
    this.$notify({
      title: '成功',
      message: msg,
      type: 'success',
      offset: 30,
    })
  }
  // 封装提示失败的弹出框
  Vue.prototype.failMsg = function(msg) {
    this.$notify.error({
      title: '错误',
      message: msg,
      offset: 30,
    })
  }
}
