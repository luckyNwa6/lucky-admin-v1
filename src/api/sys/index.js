import request from '@/utils/httpRequest'

export const getCache = () => {
  return request({
    url: request.adornUrl('/sys/config/redisData'),
    method: 'get',
  })
}
