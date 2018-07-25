<template>
  <div class="head">
    <div class="swiper">
      <div class="swiper-box">
        <div><img src="@/assets/jinbang.png" /></div>
        <div>头条内容生态服务平台</div>
        <div class="swiper-right">
          <img src="@/assets/toutiao.png" :class="logoTitle? 'sw-ri_but1': 'sw-ri_but2'" @click="_chaneLogoTitle(1)" style="height: 50px; width: 50px;"/>
          <img src="@/assets/douyin.png" :class="!logoTitle? 'sw-ri_but1': 'sw-ri_but2'" @click="_chaneLogoTitle(0)" style="height: 50px; width: 50px;"/>
        </div>
      </div>
    </div>
    <div class="nav-box">
      <div class="nav">
        <div class="nav-list">
          <div :class="listFlag? 'nav-list-one': 'nav-list-two'" @click="_chaneList(1)">日榜</div>
          <div :class="!listFlag? 'nav-list-one': 'nav-list-two'" @click="_chaneList(0)">周榜</div>
        </div>
        <div class="nav-word">
          <div v-for="(listLine, indexCol) in list" :key="indexCol" class="nav-line">
            <div v-for="(item, indexRow) in listLine" :key="indexRow" class="nav-line_less" @click="_nav(indexCol, indexRow)">
              <div v-if="logoTitle" :class="indexCol === activeIndex[0] && indexRow === activeIndex[1]? 'active': ''">{{item.type}}</div>
              <div v-if="!logoTitle" :class="indexCol === activeIndex[0] && indexRow === activeIndex[1]? 'active': ''">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getType, getDouyinType} from '../../api/index.js'
import { mapMutations } from 'vuex'
export default {
  name: 'head-one',
  data () {
    return {
      list: [],
      activeIndex: [0, 0],
      listFlag: true,
      logoTitle: true
    }
  },
  created () {
    this._getData()
  },
  methods: {
    ...mapMutations(['typeId', 'weeklyList', 'toutiaoOrDouyin', 'setFristId']),
    async _getData () {
      let type = this.logoTitle? await getType(): await getDouyinType()
      let flag = 0
      this.list = []
      if (type.length <= 0) return
      this.setFristId(type[0].id)
      while (type.length > flag) {
        this.list.push(type.slice(flag, flag + 12))
        flag += 12
      }
    },
    _nav (i, u) {
      if (this.activeIndex[0] === i && this.activeIndex[1] === u) return
      this.activeIndex = [i, u]
      this.typeId((this.list[i][u].id))
    },
    _chaneList (i) {
      if (i === 1 && this.listFlag) return
      if (i === 0 && !this.listFlag) return
      this.listFlag = !this.listFlag
      this.weeklyList(this.listFlag)
    },
    async _chaneLogoTitle (i) {
      if (i === 1 && this.logoTitle) return
      if (i === 0 && !this.logoTitle) return
      this.logoTitle = !this.logoTitle
      this.activeIndex = [0, 0]
      this.listFlag = true
      await this._getData()
      this.weeklyList(this.listFlag)
      this.typeId(this.list[0][0].id)
      this.toutiaoOrDouyin(this.logoTitle)
    }
  }
}
</script>

<style scoped>
  .head {
    width: 80%;
    margin: 0 auto;
  }
  .swiper {
    height: 100px;
    padding: 20px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .swiper-box {
    height: 100%!important;
    width: 100%!important;
    display: flex!important;
    position: relative;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1)
  }
  .swiper div:nth-child(1) {
    width: 10%;
    height: 100%;
  }
  .swiper div:nth-child(1) img{
    height: 100%;
  }
  .swiper div:nth-child(2) {
    width: 60%;
    height: 100%;
    padding-left: 10%;
    letter-spacing: 3px;
    font-size: 18px;
    color: #171717;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .swiper-right {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: flex-end!important;
    align-items: center!important;
    padding-right: 20px;
  }
  .swiper-right div {
    height: 24px!important;
    width: 70px!important;
    font-size: 14px!important;
    padding: 0px!important;
    margin: 0 10px;
  }
  .sw-ri_but1 {
    margin: 0px!important;
    cursor: pointer;
    margin-right: 10px!important;
    color: white!important;
    display: flex!important;
    justify-content: center!important;
    align-items: center!important;
    opacity: 1;
  }
  .sw-ri_but2 {
    opacity: 0.4;
    margin: 0px!important;
    cursor: pointer;
    margin-right: 10px!important;
    display: flex;
    justify-content: center!important;
    align-items: center!important;
  }
  .nav-box {
    height: 90px;
    padding: 15px;
    padding-left: 0;
    padding-right: 0;
    border: 2px solid #e6e6e6;
  }
  .nav {
    height: 100%;
    width: 100%;
    display: flex;
  }
  .nav-list {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 2px solid #dbdadb;
  }
  .nav-list div{
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin: 0 10px;
  }
  .nav-list-one {
    background: #e71a19;
    color: #fff8f8;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav-list-two {
    color: #727272;
    border: 1px solid #e6e6e6;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav-word {
    width: 80%;
    height: 100%;
    padding-left: 6%;
    padding-right: 4%;
  }
  .nav-line {
    display: flex;
    height: 50%;
  }
  .nav-line_less {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #8d8d8d;
    cursor: pointer;
  }
  .nav-line_less div{
    padding: 2px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .active {
    background: #e83433;
    color: #fdeaea;
    border-radius: 15px;
  }
</style>
