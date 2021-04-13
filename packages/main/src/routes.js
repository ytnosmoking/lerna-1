import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

export const loadView = (view) => () => import(`@/views/${view}`)


const routes = [
  {
    path: "/base",
    name: 'main-base',
    component: loadView('Base')
  },
  {
    path: "/test",
    name: 'main-test',
    component: loadView('Test')
  }
  ,
]

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes,
})


export default router
