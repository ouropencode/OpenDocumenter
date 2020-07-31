export const state = () => ({
  currentServer: '',
  currentLang: '',
  showDefinition: false,
})

export const mutations = {
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

export const getters = {
  currentServer: state => state.currentServer,
  currentLang: state => state.currentLang,
  showDefinition: state => state.showDefinition,
}
