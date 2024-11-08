import request from '@/utils/request'

export function userList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params: params,
  })
}

//获取用户名列表
export function userNameList(data) {
  return request({
    url: '/api/openApi/getUserList',
    method: 'post',
    data,
  })
}
