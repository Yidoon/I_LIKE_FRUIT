import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Search from './views/Search.vue'
import Detail from './views/Detail.vue'
import Login from './views/Login.vue'
import CollectList from './views/CollectList.vue'
import AdmiredList from './views/AdmiredList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admiredList',
      name: 'admiredList',
      component: AdmiredList
    },
    {
      path: '/collectList',
      name: 'collectList',
      component: CollectList
    }
  ]
})
