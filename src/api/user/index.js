import request from '@/utils/request'

export function userList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params: params,
  })
}
