import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    typeID: 0,
    weeklyList: true,
    touDou: true,
    fristId: null
  },
  mutations: {
    typeId (state, type) {
      state.typeID = type
    },
    weeklyList (state, week) {
      state.weeklyList = week
    },
    toutiaoOrDouyin (state, flag) {
      state.touDou = flag
    },
    setFristId (state, flag) {
      state.fristId = flag
    }
  }
})

export default store
