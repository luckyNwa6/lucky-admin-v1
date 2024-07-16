import request from '@/utils/httpRequest'

// 获取列表
export function getYunList(data) {
  return request({
    url: request.adornUrl('/bedPic/list'),
    method: 'post',
    data,
  })
}

// 删除文件
export function delRemotePic(ids, path) {
  return request({
    url: request.adornUrl('/bedPic/delRemotePic?path=' + path),
    method: 'post',
    data: ids,
  })
}
// 修改文件名称
export function modifyInfo(data) {
  return request({
    url: request.adornUrl('/bedPic/modifyInfo'),
    method: 'post',
    data,
  })
}

