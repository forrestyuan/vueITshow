import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import notFound from '@/components/notFound'

import tabhome from "@/components/tabs/tabHome";
import tabfuli from "@/components/tabs/tabFuli";
import tabsearch from "@/components/tabs/tabSearch";
import tabmoive from "@/components/tabs/tabMoive";
import tabUser from "@/components/tabs/tabUser";
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
      component: Home,redirect:'/index/home',
      children:[
        {path:'home',component:tabhome},
        {path:'fuli',component:tabfuli},
        {path:'search',component:tabsearch},
        {path:'moive',component:tabmoive},
        {path:'user',component:tabUser}
      ]
    }, {
      path: '*', 
      name:'notFound',
      component: notFound
     }
  ]
})
