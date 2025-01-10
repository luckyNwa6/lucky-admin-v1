import request from '@/utils/httpRequest'
//获取文件夹列表
export function getFolderList(data) {
  return request({
    url: request.adornUrl('/bedFolder/list'),
    method: 'post',
    data: data,
  })
}

//修改和新增文件夹信息  根据有无id
export const updateAddInfo = data => {
  return request({
    url: request.adornUrl('/bedFolder/addFolder'),
    method: 'post',
    data,
  })
}
//删除文件夹信息
export const deleteFolder = data => {
  return request({
    url: request.adornUrl('/bedFolder/deleteFolder'),
    method: 'post',
    data,
  })
}
