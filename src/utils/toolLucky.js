// 去重[{dataType:1},{dataType:1},{dataType:2}]--->dataType的v只保留一个
export function deduplicateByDataType(data) {
  const seen = new Set()
  return data.filter(item => {
    if (seen.has(item.dataType)) {
      return false
    } else {
      seen.add(item.dataType)
      return true
    }
  })
}
