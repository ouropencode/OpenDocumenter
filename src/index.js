import Vue from 'vue'

import './plugins/codegen'
import './plugins/envInject'

Vue.config.productionTip = false

// Setup webfonts
import WebFont from 'webfontloader'
WebFont.load({
  google: {
    families: ["Montserrat:200,400", "Roboto:400,700", "Source Code Pro:400"]
  }
})

// Setup vue-head
import VueHead from 'vue-head'
Vue.use(VueHead)

// Setup vue-highlight.js
import VueHighlightJS from 'vue-highlight.js'
import 'vue-highlight.js/lib/allLanguages'
import 'highlight.js/styles/default.css'
Vue.use(VueHighlightJS)

// Setup fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faCog, faHeart, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faChevronDown)
library.add(faCog)
library.add(faHeart)
library.add(faQuestionCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Smooth scrolling helper function
Vue.prototype.$smoothScroll = id => {
  history.pushState({}, '', "#" + id)
  if(id == "") id = "top"
  let ele = document.getElementById(id)
  if(!ele)
    return console.log("cannot scroll to missing ele", id)
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  })
}

// Path hashing function
Vue.prototype.$hashPath = (path, method) => {
  path = path.replace(/[^a-zA-Z0-9_-]+/g, "-")
  let hash = `${method}-${path}`
  return hash.replace(/-+$/g, "").toLowerCase()
}

// Initialise Vue
import store from './store'
import index from './index.vue'

new Vue({
  store: store,
  render: h => h(index)
}).$mount('#app')
