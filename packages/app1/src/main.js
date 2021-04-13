import Vue from 'vue'
import App from './App.vue'
import router from './routes'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

let instance = null;
function render(props = {}) {
  const { container } = props;
  instance = new Vue({
    router,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app')
}





if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('vue app bootstraped')
}

export async function mount(props) {
  console.log('props from main app', props)
  render(props)
}

export async function unmount() {


  console.log(instance)

  instance.$destroy()
  instance = null
}
