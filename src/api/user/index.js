import request from '@/utils/request'

export function userList(params) {
  return request({
    url: '/user/list1',
    method: 'get',
    params: params,
  })
}
