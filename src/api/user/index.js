import request from '@/utils/httpRequest'

export const updatePersonInfo = data => {
  return request({
    url: request.adornUrl('/sys/user/updatePersonInfo'),
    method: 'post',
    data,
  })
}

export const updateAcc = data => {
  return request({
    url: request.adornUrl('/sys/user/updateAcc'),
    method: 'post',
    data,
  })
}
