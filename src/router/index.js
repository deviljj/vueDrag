import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import merge from '@/components/merge'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/merge',
      name: 'merge',
      component: merge
    }
  ]
})
