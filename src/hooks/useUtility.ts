// phone Number RegExp
export const mobilePhoneRegExp = RegExp('^1[3|4|5|7|8][0-9]{9}$')
export const mobilePhoneReplaceRegExp = RegExp('^(\\d{3})\\d{4}(\\d{4})$')
export const strLenRegExpFn = (min = 6, max = 12) => RegExp(`^[a-zA-z0-9]{${min},${max}}$`)
export const mobilePhoneReplaceFn = (phoneText: string) => phoneText.replace(mobilePhoneReplaceRegExp, '$1****$2')

// 数组 转 对象 键为 _id
// extends 约束泛型
// reduce 归并方法
// 参数: prev 之前值， current 当前值， {} 初始值
export const ArrayToobject = <T extends { _id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}

// 对象 轩 数组
export const ObjectToArray = <T>(obj: { [key: string]: T }) => {
  return Object.keys(obj).map(key => obj[key])
}

// 过万 转 Float 两位小数，整数不带小数
export const wanToFixed = (num: number) => {
  const wan = Math.floor(num / 10000 * 100) / 100
  const isWan = Number.isInteger(wan) ? wan.toFixed(0) : wan.toFixed(2)
  return `${isWan}万`
}
