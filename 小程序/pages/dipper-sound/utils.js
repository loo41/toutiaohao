const indexAnimation = (that) => {
  const {navListState, navList, notClick} = that.data
  if (navList.length <= 2) return 
  if (navListState) {
    if (notClick) return
    that.setData({notClick: true})
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    const height = navList.length*60
    animation.height(`${height}rpx`).step()
    that.setData({
      dropDownAnimation: animation.export(),
      navListState: false,
      notClick: false
    })
  } else {
    if (notClick) return
    that.setData({notClick: true})
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    animation.height(`120rpx`).step()
    that.setData({
      dropDownAnimation: animation.export(),
      navListState: true,
      notClick: false
    })
  }
}

const _setTime  = () => {
  return new Promise((resolve, reject) => {
    let date = new Date(Date.now());
    let Y = date.getFullYear() + '年'
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月'
    let D = date.getDate() + '日'
    resolve(Y+M+D)
  })
}


const _setAjax = ({url='', data={}, header={}, method='GET', dataType='json'}) => {
  console.log(url)
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header,
      method,
      dataType,
      success: function(res) {
        console.log(res.statusCode)
        if (res.data.code && res.data.code !== 200 ) {
          return reject(res.data.code)
        } else if (res.statusCode !== 200) {
          return reject(res.statusCode)
        }
        resolve(res.data)
      },
      fail: function() {
        reject('请求错误')
      }
    })
  })
}

module.exports = {
  _indexAnimation: indexAnimation,
  _setTime: _setTime,
  _setAjax: _setAjax
}
