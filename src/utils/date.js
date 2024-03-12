//获取当前时间，并格式化输出

export function getNowFormatDateM() {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var hour = date.getHours() // 获取当前小时数(0-23)
  var minute = date.getMinutes() // 获取当前分钟数(0-59)
  var second = date.getSeconds() // 获取当前秒数(0-59)
  var show_day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  var day = date.getDay()

  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }

  var currentDate = '<div><p>' + year + '年' + month + '月' + strDate + '日</p><p>' + show_day[day] + '</p></div>'
  var HMS = hour + ':' + minute + ':' + second
  var tempTime = year + '-' + month + '-' + strDate + ' ' + HMS

  return {
    currentDate: currentDate,
    HMS: HMS,
    tempTime: tempTime,
  }
}
