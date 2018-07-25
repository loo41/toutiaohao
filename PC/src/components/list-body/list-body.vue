<style>
  @import url(./list-body.css);
</style>

<template>
  <div class="list-body">
    <div class="list-select">
      <div class="select-box">
        <div class="select-left">
            <vue-select 
              v-model="selected"
              :options="pickData"
            ></vue-select>
          <div v-if="selected !== '' && weeklyList">统计数据截至 : {{selected}}14时</div>
          <div v-if="selected !== '' && !weeklyList">统计数据截至 : {{addSiven}}14时</div>
          <div v-if="touDou">样本数量 : 89784</div>
          <div v-if="!touDou">样本数量 : 134043</div>
        </div>
      </div>
    </div>
    <div>
      <div class="list-line-box" v-if="touDou">
        <div>#</div>
        <div class="list-line-box_head">头条号</div>
        <div>粉丝数</div>
        <div>阅读数</div>
        <div>评论数</div>
        <div>发文数</div>
        <div>今榜指数</div>
      </div>
      <div class="list-line-box" v-if="!touDou">
        <div>#</div>
        <div class="list-line-box_head">抖音播主</div>
        <!--<div>播放数</div>-->
        <div>粉丝数</div>
        <div>获赞数</div>
        <div>视频数</div>
        <div>今榜指数</div>
      </div>
      <div v-for="(item, index) in nowData" :key="index" class="list-line-box" :class="index % 2 === 0? 'active-bg': ''">
        <div>
          <span v-if="page === 1 && index === 0" style="margin: 0"><img src="@/assets/one.png" style="height: 25px; width: 25px;"/></span>
          <span v-else-if="page === 1 && index === 1" style="margin: 0"><img src="@/assets/two.png" style="height: 25px; width: 25px;"/></span>
          <span v-else-if="page === 1 && index === 2" style="margin: 0"><img src="@/assets/three.png" style="height: 25px; width: 25px;"/></span>
          <span v-else="index" class="no-jiangzhang" >{{page === 1? (index + 1) : ((index + 1) + ((page - 1) * 50))}}</span>
        </div>
        <div class="img-line">
          <p class="img-box">
            <img :src="item.icon" class="list-img" v-if="touDou"/>
            <img :src="item.avatar" class="list-img" v-if="!touDou"/>
          </p>
          <span v-if="touDou"><a :href="item.link">{{item.media_name}}</a></span>
          <span v-if="!touDou"><a :href="item.link">{{item.name}}</a></span>
        </div>
        <div v-if="touDou">{{item.fans_count}}</div>
        <div v-if="touDou">{{item.view_count}}</div>
        <div v-if="touDou">{{item.comment_count}}</div>
        <div v-if="touDou">{{item.publish_num}}</div>
        <div v-if="touDou" style="color: red">{{item.gross_score}}</div>
        <!--<div v-if="!touDou">{{!item.userInfo? '': item.userInfo.totalplayer}}</div>-->
        <div v-if="!touDou">{{!item.userInfo? '': item.userInfo.totalfans}}</div>
        <div v-if="!touDou">{{!item.userInfo? '': item.userInfo.totallike}}</div>
        <div v-if="!touDou">{{!item.userInfo? '': item.userInfo.totalartworks}}</div>
        <div v-if="!touDou && item.number" style="color: red">{{item.number}}</div>
      </div>
    </div>
    <div class="page-box">
      <div @click="_upPage">上一页</div>
      <div>共: {{listData.length}} 页</div>
      <div>当前页数: {{page}}</div>
      <div @click="_downPage">下一页</div>
    </div>
    <div class="loading-box" v-show="loading">
      <vue-loading type="spiningDubbles" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
    </div>
  </div>
</template>

<script>
import VueSelect from './select'
import {_setTime} from './utils'
import { mapState } from 'vuex'
import { VueLoading } from 'vue-loading-template'
import dayjs from 'dayjs'
import {
  getDayTime, getWeekTime, 
  getDayList, getWeekList, 
  getDouyinDayTime, getDouyinWeekTime, 
  getDouyinList} from '../../api/index.js'
export default {
  data () {
    return {
      display: false,
      loading: false,
      nowDate: null,
      selected: '',
      show: false,
      time: new Date(),
      pickData: [],
      listData: [],
      nowData: [],
      page: 1,
    }
  },
  components: {VueLoading, VueSelect},
  computed: {
    ...mapState([
      'typeID',
      'weeklyList',
      'touDou',
      'fristId'
    ]),
    addSiven () {
      let flag = this.selected
      flag = `${flag.slice(0, 4)}-${flag.slice(5, 7)}-${flag.slice(8, 10)}`
      flag = this.selected
      if (this.selected.length > 12) {
        flag = flag.split('-')[1]
        flag = `${new Date().getFullYear()}年${flag}`
        flag = `${flag.slice(0, 4)}-${flag.slice(5, 7)}-${flag.slice(8, 10)}`
      } else {
        flag = `${flag.slice(0, 4)}-${flag.slice(5, 7)}-${flag.slice(8, 10)}`
      }
      let date = dayjs(flag).add(1, 'day')
      return `${date.$y}年${date.$M+1}月${date.$D}日`
    }
  },
  watch: {
    selected () {
      if (this.listData.length === 0) return
      let time = this._dealWith(this.selected)
      if (!this.weeklyList && this.touDou) this.selected = this.selected.split('-')[0]
      this._getListData(this.typeID, time)
    },
    typeID () {
      let time = this._dealWith(this.selected)
      this._getListData(this.typeID, time)
    },
    async weeklyList () {
      await this._getTime()
      let time = this._dealWith(this.selected)
      this._getListData(this.typeID, time)
    },
    touDou () {
      this._getData()
    }
  },
  created () {
    this._getData()
  },
  methods: {
    _upPage () {
      let {page, listData} = this
      if (page <= 1) return
      this.nowData = listData[page - 2]
      this.page -= 1
    },
    _downPage () {
      let {page, listData} = this
      if (page >= listData.length) return
      this.nowData = listData[page]
      this.page += 1
    },
    async _getTime () {
      let timer = null
      if (this.weeklyList) {
        timer = this.touDou? await getDayTime(): await getDouyinDayTime()
      } else {
        timer = this.touDou? await getWeekTime(): await getDouyinWeekTime()
      }
      await this.dealWithTime(timer)
    },
    async _getData () {
      this.loading = true
      let timer = this.touDou? await getDayTime(): await getDouyinDayTime()
      await this.dealWithTime(timer)
      await this._getListData()
    },
    _dealWith (date) {
      if (date.length > 12 && !this.touDou) return date
      return `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8, 10)}`
    },
    async _getListData (type, date) {
      this.loading = true
      if (!type && !date) {
        type = 0
        if (this.fristId) type = this.fristId
        date = this._dealWith(this.selected)
      }
      let list = null
      if (this.weeklyList) {
        list = this.touDou? await getDayList({type, date}): await getDouyinList({flag: 'day', type, date})
      } else {
        list = this.touDou? await getWeekList({type, date}): await getDouyinList({flag: 'week', type, date})
      }
      if (list.length <= 0) {
        this.nowData = []
        this.loading = false
        this.listData = []
        return
      }
      list.forEach((item, i) => {
        let countFans = parseInt((item.fans_count / 100000))
        let countView = parseInt((item.view_count / 100000))
        let countComment = parseInt((item.comment_count / 100000))
        let countPublish = parseInt((item.publish_num / 100000))
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
      this.listData = []
      this.page = 1
      while (parseInt(list.length / 50) > 0) {
        if (list[0] === 0) list.shift()
        this.listData.push(list.splice(0, 50, 0))
      }
      if (list.length > 0) this.listData.push(list)
      let len = this.listData[this.listData.length - 1].length
      if (len && this.listData[this.listData.length - 1][0] === 0) {
          if (len === 1) {
            this.listData.splice(this.listData.length - 1, 1)
          } else {
            this.listData[this.listData.length - 1].shift()
          }
      }
      this.nowData = this.listData[0]
      this.loading = false
    },
    async addTime(item) {
      item = item.split('-')
      item[0] += '年'
      item[1] += '月'
      item[2] += '日'
      item = item.join('')
      return item
    },
    async dealWithTime (timer) {
      let Rex = /[\u4e00-\u9fa5]/ig
      if (Rex.test(timer)) {
        this.pickData = []
        timer.forEach((item, i) => {
          this.pickData.push(item)
        })
        this.selected = this.pickData[0]
        return
      }
      let {selected} = this
      this.pickData = []
      if (!this.weeklyList) {
        await timer.forEach(async(item, i) => {
          let flag = item
          flag = await this.addTime(flag)
          let addSiveDate = dayjs(item).add(7, 'day')
          addSiveDate = await this.addTime(`${addSiveDate.$y}-${addSiveDate.$M + 1}-${addSiveDate.$D}`)
          this.pickData.push(`${flag}-${addSiveDate}`)
          this.selected = this.pickData[0].split('-')[0]
        })
      } else {
        await timer.forEach((item, i) => {
          item = item.split('-')
          item[0] += '年'
          item[1] += '月'
          item[2] += '日'
          item = item.join('')
          this.pickData.push(item)
        })
        this.selected = this.pickData[0]
      }
    }
  }
}
</script>
