//index.js
//获取应用实例
const app = getApp()
const {_indexAnimation, _setTime} = require('./utils')
const {_setAjax} = require('./utils')

Page({
  data: {
    listIndex: [0, 0],
    navList: [],
    navListState: true,
    dropDownAnimation: {},
    notClick: false,
    select: {
      date: ''
    },
    listData: {},
    listSwitch: true,
    displayDate: '',
    rankingList: [],
    rankingControl: [],
    openPicker: false
  },
  onShareAppMessage () {},
  onLoad: function () {
    this._getData()
  },
  _getData () {
    wx.showLoading({title: '数据加载中'})
    let typeOptions = {url: 'https://api.nowrank.cn/get/toutiao_type?callback=json'}
    let dateOptions = {url: 'https://api.nowrank.cn/get/toutiao_day/time?callback=json'}
    let that = this
    Promise.all([_setAjax(typeOptions), _setAjax(dateOptions)]).then((result) => {
      const {navList, listData, select} = that.data
      let flag = 0
      let type = result[0]
      listData.time = result[1]
      this._setWeek(result[1][0])
      select.date = result[1][0].split('-')
      select.date[0] += '年'
      select.date[1] += '月'
      select.date[2] += '日'
      select.date = select.date.join('')
      while(type.length > flag) {
        navList.push(type.slice(flag, flag+6))
        flag+=6
      }
      that.setData({navList, listData, select})
      that._getList().then(() => {
        setTimeout(() => {wx.hideLoading()}, 1000)
      }).catch(() => setTimeout(() => {wx.hideLoading()}, 1000))
    }).catch(() => setTimeout(() => {wx.hideLoading()}, 1000))
  },
  _setWeek (date, time) {
    let flag = time || 1
    let date7 = new Date((new Date(date).getTime() + flag * 60 * 60 * 1000 * 24))
    let timer = null
    if (time) {
      timer = `${date7.getFullYear()}-${date7.getMonth()+1 > 10? date7.getMonth()+1: ('0'+(date7.getMonth()+1))}-${date7.getDate() > 10? date7.getDate(): ('0' + date7.getDate())}`
      return timer
    } else {
      timer = `${date7.getFullYear()}年${date7.getMonth()+1 > 10? date7.getMonth()+1: ('0'+(date7.getMonth()+1))}月${date7.getDate() > 10? date7.getDate(): ('0' + date7.getDate())}日`
    }
    this.data.displayDate = timer
    this.setData({displayDate: this.data.displayDate })
  },
  _removeSive (date) {
    let date7 = new Date((new Date(date).getTime() - 7 * 60 * 60 * 1000 * 24))
    return `${date7.getFullYear()}-${date7.getMonth()+1 > 10? date7.getMonth()+1: ('0'+(date7.getMonth()+1))}-${date7.getDate() > 10? date7.getDate(): ('0' + date7.getDate())}`
  },
  _getList (type, date) {
    wx.showLoading({title: '数据加载中'})
    let {rankingList, listData, rankingControl, listSwitch} = this.data
    if (!type && !date) {
      type = this.data.navList[0][0].id || 0
      date = listData.time[0]
    }
    let listOptions
    if (listSwitch) {
      listOptions = {url: `https://api.nowrank.cn/get/toutiao_day/${type}/${date}?callback=json`}
    } else {
      listOptions = {url: `https://api.nowrank.cn/get/toutiao_week/${type}/${date}?callback=json`}
    }
    let that = this
    return new Promise((resolve, reject) => {
      _setAjax(listOptions).then((result) => {
        rankingList = result
        rankingControl = new Array(result.length).fill(false)
        rankingList.forEach((item, i) => {
          let countFans = parseInt((item.fans_count / 10000))
          let countView = parseInt((item.view_count / 10000))
          let countComment = parseInt((item.comment_count / 10000))
          let countPublish = parseInt((item.publish_num / 10000))
          if (countFans > 0) {
            rankingList[i].fans_count = `${countFans}万+`
          }
          if (countView > 0) {
            rankingList[i].view_count = `${countView}万+`
          }
          if (countComment > 0) {
            rankingList[i].comment_count = `${countComment}万+`
          }
          if (countPublish > 0) {
            rankingList[i].publish_num = `${countPublish}万+`
          }
        });
        setTimeout(() => {wx.hideLoading()}, 500)
        that.setData({rankingList, rankingControl})
        resolve(rankingList)
      }).catch((e) => {
        reject(e)
        setTimeout(() => {wx.hideLoading()}, 500)
      })
    })
  },
  _changeSwitch (e) {
    let id = e.currentTarget.id
    let {listSwitch} = this.data
    if (Number(id) === 1 && listSwitch) return
    if (Number(id) === 0 && !listSwitch) return
    this.setData({listSwitch: !listSwitch})
    this._changeTime()
  },
  _changeTime () {
    let listOptions = null
    let {listSwitch, listIndex, listData, select} = this.data
    if (listSwitch) {
      listOptions = {url: `https://api.nowrank.cn/get/toutiao_day/time?callback=json`}
    } else {
      listOptions = {url: `https://api.nowrank.cn/get/toutiao_week/time?callback=json`}
    }
    let that = this
    _setAjax(listOptions).then((result) => {
      if (!this.data.listSwitch) {
        result.forEach((item, i) => {
          result [i] = `${item} 至 ${this._setWeek(item, 7)}`
        })
        listData.time = result
        this._setWeek(result[0].split('至')[1])
        select.date = result[0].split('至')[1].split('-')
        select.date[0] += '年'
        select.date[1] += '月'
        select.date[2] += '日'
        select.date = select.date.join('').replace(/\s+/g,"")
      } else {
        listData.time = result
        this._setWeek(result[0])
        select.date = result[0].split('-')
        select.date[0] += '年'
        select.date[1] += '月'
        select.date[2] += '日'
        select.date = select.date.join('')
      }
      that.setData({listData, select})
      let timer = `${select.date.slice(0, 4)}-${select.date.slice(5, 7)}-${select.date.slice(8, 10)}`
      if (!this.data.listSwitch) {
        timer = this._removeSive(timer)
      }
      console.log(timer)
      let index = this.data.navList[listIndex[0]][listIndex[1]].id
      this._getList(index, timer)
    })
  },
  _sure (e) {
    let data = e.detail
    if (JSON.stringify(e.detail) === '[]') {
      this.setData({openPicker: false})
      return
    }
    let {select, listIndex} = this.data
    let index = this.data.navList[listIndex[0]][listIndex[1]].id
    if (!this.listSwitch) {
      let flag = data.join('').split('至')[1].replace(/\s+/g,"")
      select.date = flag
      this._setWeek(flag)
      flag = this._removeSive(flag)
      this._getList(index, flag)
    } else {
      let flag = data.join('')
      this._getList(index, flag)
      select.date = flag
      this._setWeek(flag)
    }
    select.date = select.date.split('-')
    select.date[0] += '年'
    select.date[1] += '月'
    select.date[2] += '日'
    select.date = select.date.join('')
    this.setData({
      openPicker: false,
      select
    })
  },
  _close (e) {
    this.setData({openPicker: false})
  },
  _changeState (e) {
    let id = Number(e.currentTarget.id)
    const {rankingControl} = this.data
    rankingControl[id] = !rankingControl[id]
    this.setData({rankingControl})
  },
  _nav (e) {
    const {id} = e.currentTarget
    const {listIndex, select} = this.data
    const [indexOne, indexTwo] = id.split('&&')
    let flag = []
    flag[0] = Number(indexOne)
    flag[1] = Number(indexTwo)
    if (flag[0] === listIndex[0] && flag[1] === listIndex[1]) return
    listIndex[0] = flag[0]
    listIndex[1] = flag[1]
    let index = this.data.navList[listIndex[0]][listIndex[1]].id
    let timer = `${select.date.slice(0, 4)}-${select.date.slice(5, 7)}-${select.date.slice(8, 10)}`
    if (!this.data.listSwitch) {
      timer = this._removeSive(timer)
    }
    this._getList(index, timer)
    this.setData({listIndex})
  },
  _navMore () {
    _indexAnimation(this)
  },
  _openClosePicker () {
    this.setData({openPicker: true})
  }
})
