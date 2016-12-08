// 获取谁数据
export const getRandom = function(len = 8) {
  const chars = ['0','1','2','3','4','5','6','7','8','9',
                 'A','B','C','D','E','F','G','H','I','J',
                 'K','L','M','N','O','P','Q','R','S','T',
                 'U','V','W','X','Y','Z']
  let res = ''
  for(let i = 0; i < len; i++) {
    res += chars[Math.ceil(Math.random() * (chars.length - 1))]
  }
  return res
}

/**
 * 时间格式化
 * @param  {[Number]} date 时间戳
 * @param  {[DateString]} fmt  时间格式
 * dateFormat('yyyy-MM-dd hh:mm:ss.S') => 2016-03-12 20:13:32.232
 * @return {[date]} 时间
 */
export const dateFormat = (date, fmt) => {
  const date1 = new Date(date)
  const o = {
    'M+': date1.getMonth() + 1, // 月
    'd+': date1.getDate(), // 日
    'h+': date1.getHours(), // 小时
    'm+': date1.getMinutes(), // 分
    's+': date1.getSeconds(), // 秒
    'q+': Math.floor((date1.getMonth() + 3) / 3), // 季度S
    'S' : date1.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date1.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in o) {
    if(new RegExp('(' + k + ')').test(fmt)) {
      fmt =fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    }
  }
  return fmt
}