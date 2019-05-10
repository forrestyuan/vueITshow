
import Vue from 'vue'
import Vuex from './store/index';
import App from './App'
import router from './router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.use(MintUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Vuex,
  template: '<App/>',
  components: { App },

})
