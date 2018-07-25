<template>
  <div id="app">
    <keep-alive>
      <transition name="slide">
        <router-view />
      </transition>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$nextTick(() => {
      this.$router.push('/')
    })
  },
}
</script>

<style scoped>
.slide-enter-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
</style>
