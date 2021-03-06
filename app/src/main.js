import Vue from 'vue'
import Electron from 'vue-electron'

import Resource from 'vue-resource'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'


import App from './App'
import router from './routes'
import store from './vuex/store'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(ElementUI)
Vue.config.debug = true


/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app')
