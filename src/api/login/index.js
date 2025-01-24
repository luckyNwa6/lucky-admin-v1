import request from '@/utils/httpRequest'

export const reqLogin = data => {
  return request({
    url: request.adornUrl('/sys/login'),
    method: 'post',
    data,
  })
}
export const getQQ = () => {
  return request({
    url: request.adornUrl('/sys/getQQCode'),
    method: 'get',
  })
}
export const getPersonInfo = () => {
  return request({
    url: request.adornUrl('/sys/user/info'),
    method: 'get',
    params: request.adornParams(),
  })
}
