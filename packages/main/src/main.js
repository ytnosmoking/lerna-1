import Vue from 'vue'
import App from './App.vue'
import router from './routes';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css'



import configJson from 'app-tools/lib/config.json';

import { registerMicroApps, start } from 'qiankun'

const isDev = process.env.NODE_ENV === 'development'
Vue.use(ElementUI)
Vue.config.productionTip = false


console.log(configJson);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


registerMicroApps(
  configJson.arrConfig.map(item => {
    return {
      ...item,
      entry: isDev ? item.entry : `/${item.name}/`
    }
  })
)

start({
  prefetch: false
})
