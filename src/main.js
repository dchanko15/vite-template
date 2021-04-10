import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'keen-ui/src/bootstrap'

import axios from 'axios'
import store2 from 'store2'

import './assets/css/font_bpg_arial.css'
import './assets/css/flexboxgrid.css'


Vue.config.productionTip = false;
//Vue.use(SuiVue);


axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.prototype.$store2 = store2.session.namespace('uee-regscan');

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
