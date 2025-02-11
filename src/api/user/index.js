import request from '@/utils/httpRequest'

export const updatePersonInfo = data => {
  return request({
    url: request.adornUrl('/sys/user/update'),
    method: 'post',
    data,
  })
}
