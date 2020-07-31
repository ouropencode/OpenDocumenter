import Vue from 'vue'
import Router from 'vue-router'

import Index from '~/Index'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'hash',
    routes: [
      {
        path: '/',
        component: Index
      },
      {
        path: '/:section',
        component: Index
      }
    ]
  })
}
