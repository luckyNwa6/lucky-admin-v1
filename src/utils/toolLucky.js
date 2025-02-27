// 去重[{dataType:1},{dataType:1},{dataType:2}]--->dataType的v只保留一个
export function deduplicateByDataType(data) {
  const seen = new Set()
  return data.filter(item => {
    if (seen.has(item.dataType)) {
      return false
    } else {
      seen.add(item.dataType)
      return true
    }
  })
}

/*
base64转文件
*/
export const base64ToFile = (base, name) => {
  // 将文件名按点分割，获取扩展名
  let arr = name.split('.')
  // 构建MIME类型
  const mime = 'application/' + arr[1]
  // 解码Base64字符串
  const bstr = atob(base)
  // 获取解码后的字符串长度
  let n = bstr.length
  // 创建一个Uint8Array对象
  const u8arr = new Uint8Array(n)
  // 将解码后的字符串转换为Uint8Array
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  // 检查是否支持msSaveBlob方法（IE10及更高版本）
  if (window.navigator.msSaveBlob) {
    // 尝试使用msSaveBlob方法保存Blob对象
    try {
      const blobObject = new Blob([u8arr], { type: mime })
      window.navigator.msSaveBlob(blobObject, name)
    } catch (e) {
      console.log(e) // 记录错误信息
    }
  } else {
    // 创建Blob对象
    const url = window.URL.createObjectURL(new Blob([u8arr]))
    // 创建一个a标签元素
    const link = document.createElement('a')
    // 设置a标签的href属性为Blob对象的URL
    link.href = url
    // 设置a标签的download属性为文件名
    link.setAttribute('download', name)
    // 将a标签添加到body中
    document.body.appendChild(link)
    // 触发点击事件以下载文件
    link.click()
    // 移除a标签
    document.body.removeChild(link)
    // 释放Blob对象的URL
    window.URL.revokeObjectURL(url)
  }
}
