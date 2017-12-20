import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import notFound from '@/components/notFound'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Welcome',
      component:Welcome
    },
    {
      path: '/index',
      name: 'Home',
      component: Home
    }, {
      path: '*', 
      name:'notFound',
      component: notFound
     }
  ]
})
