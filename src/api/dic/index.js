import request from '@/utils/httpRequest'
//用来处理字典
export function dicData(types) {
  return request({
    url: request.adornUrl('/generator/sysdic/list?key=' + types),
    method: 'get',
  })
}
//为空会全部获取，所以给它个没有的值即可
export const getDic = (types = 'lucky') => {
  return new Promise(async resolve => {
    let dicRes = (await dicData(types).catch(() => {})) || {}
    // console.log('从后端获取到的数据字典为：', dicRes)
    let {
      data: {
        page: { list = [] },
      },
    } = dicRes //结构里面的对象
    let groupDic = groupByKey(list, 'dataType') //通过dataType进行分组
    // console.log('🚀 ~ getDic ~ groupDic:', groupDic)
    resolve(groupDic)
  })
}

function groupByKey(data, key) {
  return data.reduce((accumulator, item) => {
    const keyValue = item[key]
    if (!accumulator[keyValue]) {
      accumulator[keyValue] = []
    }
    accumulator[keyValue].push(item)
    return accumulator
  }, {})
}
