import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import Vuelazyload from 'vue-lazyload'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

fastclick.attach(document.body)
Vue.use(Vuelazyload, {
  loading: require('common/image/timg.gif')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
