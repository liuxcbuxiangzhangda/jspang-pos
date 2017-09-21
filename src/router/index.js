import Vue from 'vue'
import Router from 'vue-router'
import pos from '@/components/pos'


Vue.use(Router)

export default new Router({
 mode:'history',
  routes: [
    {
      path: '/',
      name: 'pos',
      component: pos
    }
  ]
})
