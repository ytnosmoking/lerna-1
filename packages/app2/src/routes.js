

import Vue from 'vue';
import VueRouter from "vue-router";


const packInfo = require('../package.json');

Vue.use(VueRouter)

const loadView = (view) => () => import(`@/views/${view}`)




const routes = [
  {
    path: '/',
    name: 'base2',
    component: loadView('base')

  },
  {
    path: '/hello',
    name: 'hello2',
    component: loadView('hello')

  }
]


const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? `/application-${packInfo.name}/` : '/',

  mode: 'history',
  routes,
})


export default router;