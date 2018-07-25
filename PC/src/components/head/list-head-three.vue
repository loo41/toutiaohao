<template>
  <div class="list-three-box">
    <div class="list-three-head">
      <div class="head">
        <div class="head-box">
          <div>
            <img src="@/assets/xinbang.png" style="height: 100%" />
          </div>
          <div class="head-serch">
            <div class="seach-title">
              <span>广告</span>
              <span>报告</span>
              <span>咨讯</span>
              <span>公众号</span>
              <span>趋势</span>
              <span>文章</span>
              <span>正版转载</span>
            </div>
            <div class="seach-box">
              <p class="seach">
                <input placeholder="请输入微信公众号ID 名称 (如: 新增)"/>
                <span>so</span>
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped>
.list-three-head {
  height: 110px;
  width: 100%;
  border-bottom: 2px solid #e5e5e5;
}
.head {
  padding: 20px 0px;
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
.head-box {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.head-box div:nth-child(1) {
  height: 100%;
  width: 160px;
  margin: 0px;
}
.head-box div:nth-child(2) {
  width: 60%;
  height: 100%;
  padding: 0px 30px;
  margin: 0px;
  display: flex;
  flex-direction: column!important;
}
.head-serch div{
  height: 50%!important;
  width: 100%!important
}
.seach-title {
  display: flex;
  justify-content: flex-start;
}
.seach-title span{
  margin: 0px;
  display: block;
  width: 8%;
  font-size: 16px;
  color: #bdbdbd;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.seach-title span:nth-child(4) {
  width: 10%;
}
.seach-title span:last-child{
  width: 12%;
}
.seach-box {
  display: flex;
  justify-content: flex-start;
  padding: 0px!important;
}
.seach {
  width: 80%!important;
  height: 90%!important;
  display: flex;
  flex-direction: row!important;
  position: relative;
  margin: 0px;
}
.seach input{
  width: 100%;
  height: 100%;
  border: 1px solid #f0f0f0;
  border-right: 0px;
  font-size: 12px;
}
.seach span{
 width: 5%;
 position: absolute;
 right: 0;
 height: 100%;
}
</style>
