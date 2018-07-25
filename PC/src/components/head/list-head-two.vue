<template>
  <div class="box">
    <div class="nav-box">
      <div class="nav">
        <div class="nav-logo">
          <div class="nav-logo-box">
            <img src="@/assets/jinbang.png" class="nav-logo-box-img"/>
          </div>
        </div>
        <div class="nav-list">
          <div :class="listFlag? 'nav-list-one': 'nav-list-two'" @click="_chaneList(0)">日榜</div>
          <div :class="!listFlag? 'nav-list-one': 'nav-list-two'" @click="_chaneList(1)">周榜</div>
        </div>
        <div class="nav-word">
          <div v-for="(listLine, indexCol) in list" :key="indexCol" class="nav-line">
            <div v-for="(item, indexRow) in listLine" :key="indexRow" class="nav-line_less" @click="_nav(indexCol, indexRow)">
              <div :class="indexCol === activeIndex[0] && indexRow === activeIndex[1]? 'active': ''">{{item}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        ['总排名', '视频榜', '时事', '财经', '军事', '历史', '教育', '汽车', '文化', '科技', '搞笑', '娱乐'],
        ['总排名', '视频榜', '时事', '财经', '军事', '历史', '教育', '汽车', '文化', '科技', '搞笑', '娱乐']
      ],
      activeIndex: [0, 0],
      listFlag: true
    }
  },
  methods: {
    _nav (i, u) {
      this.activeIndex = [i, u]
    },
    _chaneList (i) {
      if (i) this.listFlag = false
      if (!i) this.listFlag = true
    }
  }
}
</script>

<style scoped>
  .box {
    width: 80%;
    margin: 0 auto;
  }
  .nav-box {
    height: 90px;
    padding: 15px;
    padding-left: 0;
    padding-right: 0;
    border: 1px solid #e6e6e6;
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
    width: 65%;
    height: 100%;
    padding-left: 2%;
    padding-right: 2%;
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
  .nav-logo {
    border-right: 2px solid #dbdadb;
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav-logo-box {
    width: 90px;
    height: 60px;
  }
  .nav-logo-box-img {
    height: 100%;
  }
</style>
