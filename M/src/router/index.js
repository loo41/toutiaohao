import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index.vue'
import Douyin from '@/components/douyin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/douyin',
      name: 'douyin',
      component: Douyin
    }
  ]
})
