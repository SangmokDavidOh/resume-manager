import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Template1 from '@/components/template/Template1.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/template',
      name: 'Template1',
      component: Template1
    }
  ]
})
