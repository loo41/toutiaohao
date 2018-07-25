const _setTime = () => {
  return new Promise((resolve, reject) => {
    let date = new Date(Date.now())
    let Y = date.getFullYear() + '年'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
    let D = date.getDate() + '日'
    resolve(Y + M + D)
  })
}

export {
  _setTime
}
