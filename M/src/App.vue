<template>
  <div id="app">
    <router-view/>
    <div class="nabbar">
      <div @click="_router('/')" :class="$route.path == '/'? 'nabbar-active': ''"> <img src="./assets/toutiao.png" style="height: 50px; width: 50px" /></div>
      <div @click="_router('douyin')" :class="$route.path == '/'? '' : 'nabbar-active'"> <img src="./assets/douyin.png" style="height: 50px; width: 50px"/></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    _router (pagram) {
      this.$router.push(pagram)
    }
  }
}
</script>

<style>
* {
  margin: 0rem;
  padding: 0rem;
}
#app {
  height: 100%;
  width: 100%;
}
.nabbar {
  position: fixed;
  bottom: 0px;
  left: 0rem;
  right: 0rem;
  width: 100%;
  height: 6rem;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  background: white;
  align-items: center;
}
.nabbar div{
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}
.nabbar-active {
  background: #f2f5f6!important;
}
</style>
