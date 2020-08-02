import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = () => ({
  currentServer: '',
  currentLang: '',
  showDefinition: false,
})

const mutations = {
  setServer(state, server) {
    state.currentServer = server
  },
  setLang(state, lang) {
    state.currentLang = lang
  },
  setShowDefinition(state, show) {
    state.showDefinition = show
  },
}

const getters = {
  currentServer:  state => state.currentServer,
  currentLang:    state => state.currentLang,
  showDefinition: state => state.showDefinition,
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
})
