
import request from '@/utils/httpRequest'

// 下载MinIO文件
export function loadMinIOFile(pathUrl) {
  return request({
    url: request.adornUrl('/sys/oss/downLoadMinIOFile'),
    method: 'get',
    // responseType: "blob", //必须加这个才能返回2进制
    params: request.adornParams({
      'pathUrl': pathUrl
    }),
  })
}
