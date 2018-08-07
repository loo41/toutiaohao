<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url(./index.less);
</style>

<template>
  <div style="height: 100%">
    <div class="body-containers" :style="screenSmallStyle">
      <div class="douyin-containers">
        <div class="douyin-containers-box">
          <div :class="navList.length <= 2?'header-nav_less-two': 'header-nav'" :style="navHeight">
            <div v-for="(item, index) in navList" :key="index" class="douyin-nav-line">
              <div v-for="(less, idx) in item" :key="idx" @click="_nav(index, idx)">
                <span :class="listIndex[0] === index && listIndex[1] === idx? 'douyin-nav-line-active' : 'douyin-nav-line-none'">{{less.name}}</span>
              </div>
            </div>
          </div>
          <!--
          <div class="header-nav_but">
            <div class="header-but" @click="_ariseMore">
              <span class="iconfont icon-sanjiaoxing" v-if="!navHeight.flag"></span>
              <span class="iconfont icon-03" v-if="navHeight.flag"></span>
            </div>
          </div>
          -->
        </div>
      </div>
      <div class="list-box">
        <div :class="listSwitch? 'list_left': 'list_right'" @click="_changeSwitch(1)">日榜</div>
        <div :class="!listSwitch? 'list_left': 'list_right'" @click="_changeSwitch(0)">周榜</div>
      </div>
      <div class="date-box">
        <div class="date-con">
          <div class="date_box fl-ce"  @click="_openDate">
            <div class="date-check">
              <div class="fl-ce" v-if="date !== ''">
                {{date}}
              </div>
              <div style="width: 20%" >
                <span class="iconfont icon-icon-arrDown-fill"  />
              </div>
            </div>
          </div>
          <div class="info-box">
            <span>样本数量: 134043</span>
            <span v-if="dete !== '' && listSwitch">统计数据截止: {{date}}14时</span>
            <span v-else-if="dete !== '' && !listSwitch">统计数据截止: {{addSiven}}14时</span>
          </div>
        </div>
      </div>
      <div class="list-scroller">
        <div class="list-title">
          <div>排名</div>
          <div>抖音博主</div>
          <div>今榜指数</div>
        </div>
        <div class="scroller-box">
          <scroller>
            <div v-for="(item ,idx) in rankingList" :key="idx" class="scroller-list">
              <div class="scroller-list-img" :class="idx % 2 === 0? 'active-color': ''">
                <div>
                  <span class="" v-if="idx === 0" > <img src="@/assets/one.png" style="height: 2.5rem; height: 2.5rem;" /></span>
                  <span class="" v-else-if="idx === 1" ><img src="@/assets/two.png" style="height: 2.5rem; height: 2.5rem;" /></span>
                  <span class="" v-else-if="idx === 2" ><img src="@/assets/three.png" style="height: 2.5rem; height: 2.5rem;" /></span>
                  <span v-else class="index-style">{{idx + 1}}</span>
                </div>
                <div>
                  <div class="gz-img_box fl-ce">
                    <div>
                      <img :src="item.avatar" style="width: 95%; height: 95%; border-radius: 50%!important;"/>
                    </div>
                  </div>
                  <div class="list-gz_name fl-ce">
                    <a :href="item.link">{{item.name}}</a>
                  </div>
                </div>
                <div>
                <div class="index">{{item.number}}</div>
                  <div class="index-but fl-ce">
                    <div class="icon-box" @click="_changeState(idx)">
                      <span class="iconfont icon-sanjiaoxing" v-if="!rankingControl[idx]"></span>
                      <span class="iconfont icon-03" v-if="rankingControl[idx]"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div  class="ranking-more-data" v-if="rankingControl[idx]">
                <!--<div>播放数: {{!item.userInfo? '': item.userInfo.totalplayer}}</div>-->
                <div>粉丝数: {{!item.userInfo? '': item.userInfo.totalfans}}</div>
                <div>获赞数: {{!item.userInfo? '': item.userInfo.totallike}}</div>
                <div>视频数: {{!item.userInfo? '': item.userInfo.totalartworks}}</div>
              </div>
            </div>
          </scroller>
        </div>
      </div>
    </div>
    <vue-pickers
      :show="show"
      :columns="columns"
      :defaultData="defaultData"
      :selectData="pickData"
      @cancel="close"
      @confirm="confirmFn" />
    <div class="loading-box" v-show="loading">
      <vue-loading type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
    </div>
  </div>
</template>

<script>
import vuePickers from 'vue-pickers'
import { VueLoading } from 'vue-loading-template'
import {getDouyinType, getDouyinDayTime, getDouyinWeekTime, getDouyinList} from '../api/index.js'
import dayjs from 'dayjs'
export default {
  name: 'douyin',
  data () {
    return {
      show: false,
      columns: 1,
      date: '',
      defaultData: [],
      pickData: {data1: []},
      loading: false,
      screenSmall: true,
      screenSmallStyle: {},
      navHeight: {
        height: '6.5rem',
        flag: false
      },
      listSwitch: true,
      listIndex: [0, 0],
      rankingControl: [false, false, false, false, false, false],
      navList: [],
      rankingList: []
    }
  },
  computed: {
    addSiven () {
      let flag = this.date
      if (this.date.length > 12) {
        flag = flag.split('-')[1]
      }
      flag = `${new Date().getFullYear()}年${flag}`
      flag = `${flag.slice(0, 4)}-${flag.slice(5, 7)}-${flag.slice(8, 10)}`
      let date = dayjs(flag).add(1, 'day')
      return `${date.$y}年${date.$M + 1}月${date.$D}日`
    }
  },
  components: {vuePickers, VueLoading},
  created () {
    this._getData()
  },
  methods: {
    async _getData () {
      this.loading = true
      let [type, timer] = await Promise.all([getDouyinType(), getDouyinDayTime()])
      let {navList} = this
      let flag = 0
      while (type.length > flag) {
        navList.push(type.slice(flag, flag + 6))
        flag += 6
      }
      await this.dealWithTime(timer)
      await this._getListData()
    },
    async dealWithTime (timer) {
      let {pickData, date} = this
      let Rex = /[\u4e00-\u9fa5]/
      if (Rex.test(timer)) {
        timer.forEach((item, i) => {
          timer[i] = {text: item, value: item}
        })
        this.pickData.data1 = timer
        this.date = timer[0].value
        this.defaultData.splice(0, 1, pickData.data1[0])
        return
      }
      timer.forEach((item, i) => {
        timer[i] = {text: item, value: item}
      })
      this.pickData.data1 = timer
      date = timer[0].value.split('-')
      date[0] += '年'
      date[1] += '月'
      date[2] += '日'
      this.date = date.join('')
      this.defaultData.splice(0, 1, pickData.data1[0])
    },
    async _getListData (type, date) {
      this.loading = true
      if (!type && !date) {
        type = this.navList[0][0].id
        date = this.defaultData[0].value
      }
      let list = null
      if (this.listSwitch) {
        let flag = 'day'
        list = await getDouyinList({flag, type, date})
      } else {
        let flag = 'week'
        list = await getDouyinList({flag, type, date})
      }
      this.rankingControl = new Array(list.length).fill(false)
      list.forEach((item, i) => {
        let countFans = parseInt((item.fans_count / 10000))
        let countView = parseInt((item.view_count / 10000))
        let countComment = parseInt((item.comment_count / 10000))
        let countPublish = parseInt((item.publish_num / 10000))
        if (countFans > 0) {
          list[i].fans_count = `${countFans}万+`
        }
        if (countView > 0) {
          list[i].view_count = `${countView}万+`
        }
        if (countComment > 0) {
          list[i].comment_count = `${countComment}万+`
        }
        if (countPublish > 0) {
          list[i].publish_num = `${countPublish}万+`
        }
      })
      this.rankingList = list
      this.loading = false
    },
    async _changeSwitch (flag) {
      if (flag === 1 && this.listSwitch) return
      if (flag === 0 && !this.listSwitch) return
      this.listSwitch = !this.listSwitch
      await this._changeTime()
    },

    async _changeTime () {
      let timer = null
      let {listSwitch, listIndex} = this
      if (listSwitch) {
        timer = await getDouyinDayTime()
      } else {
        timer = await getDouyinWeekTime()
      }
      await this.dealWithTime(timer)
      let time = await this.dealWithTrueTime()
      let index = this.navList[listIndex[0]][listIndex[1]].id
      await this._getListData(index, time)
    },

    dealWithTrueTime () {
      let time = null
      if (this.date.length > 12) {
        time = this.date
      } else {
        time = `${this.date.slice(0, 4)}-${this.date.slice(5, 7)}-${this.date.slice(8, 10)}`
      }
      return time
    },

    _changeState (index) {
      let i = Number(index)
      this.rankingControl.splice(i, 1, !this.rankingControl[i])
    },

    async _nav (indexOne, indexTwo) {
      let {listIndex} = this
      if (listIndex[0] === indexOne && listIndex[1] === indexTwo) return
      this.listIndex.splice(0, 1, indexOne)
      this.listIndex.splice(1, 1, indexTwo)
      let index = this.navList[listIndex[0]][listIndex[1]].id
      let timer = await this.dealWithTrueTime()
      await this._getListData(index, timer)
    },

    _ariseMore () {
      const i = this.navList.length
      if (i <= 2) return
      if (this.navHeight.flag) {
        this.navHeight = {
          height: `6.5rem`,
          flag: false
        }
        return
      }
      this.navHeight = {
        height: `${i * 3.25}rem`,
        flag: true
      }
    },

    _openDate () {
      this.show = true
    },

    close () {
      this.show = false
    },

    async confirmFn (val) {
      this.show = false
      this.defaultData = [val.select1]
      let time = val.select1.value
      let {date, listIndex} = this
      if (time.length > 12) {
        this.date = time
      } else {
        date = time.split('-')
        date[0] += '年'
        date[1] += '月'
        date[2] += '日'
        this.date = date.join('')
      }
      let index = this.navList[listIndex[0]][listIndex[1]].id
      await this._getListData(index, time)
    },

    toShow () {
      this.show = true
    }
  }
}
</script>
