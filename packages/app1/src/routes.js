

import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter)

const packInfo = require('../package.json');

const loadView = (view) => () => import(`@/views/${view}`)




const routes = [
  {
    path: '/',
    name: 'base',
    component: loadView('base')

  },
  {
    path: '/hello',
    name: 'hello',
    component: loadView('hello')
  },
  {
    path: '*',
    redirect: '/'
  }
]


const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? `/application-${packInfo.name}/` : '/',

  mode: 'history',
  routes,
})


export default router;