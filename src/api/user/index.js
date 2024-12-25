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
//开源的el里的下拉框里的城市列表
export function getOpenCityList(query) {
  return request({
    url: `https://cli.avuejs.com/api/area/getProvince?id=${query}`,
    method: 'get',
  })
}
