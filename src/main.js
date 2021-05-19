import Vue from 'vue'
import App from './App.vue'
import router from './router'


import 'keen-ui/src/bootstrap'

import axios from 'axios'
import store2 from 'store2'

import './assets/css/font_bpg_arial.css'
import 'flexboxgrid2/flexboxgrid2.min.css'
import './assets/css/units.scss'
import loadConfigData from './configData.js'


async function getUrl(url, data) {
  let link;
  if (Vue.prototype.$globalState.apiUrl.indexOf("/testData") === -1) {
    link = url;
  } else
    link = Vue.prototype.$globalState.baseUrl + "testData/"+url + ".json";

  return await axios.get(link, {params: data});
}

async function postUrl(url, data) {
  if (Vue.prototype.$globalState.apiUrl.indexOf("/testData") === -1) {
    return await axios.post(url, data);
  } else {
    let link = Vue.prototype.$globalState.baseUrl +"testData/"+ url + "-response.json";
    return await axios.get(link);
  }
}


Vue.config.productionTip = false;

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.prototype.$store2 = store2.session.namespace('uee-regScan');
Vue.prototype.$getData = getUrl;
Vue.prototype.$postData = postUrl;

router.beforeEach((to, from, next) => {
  let globalState = Vue.prototype.$globalState;

  if (to.meta.role && globalState.user.userRole !== to.meta.role) {
    next({
      path: '/restricted',
    })
  } else {
    next()
  }
});


(async function start() {
  let t = await loadConfigData();
  Vue.prototype.$globalState = Vue.observable(t);
  let user = Vue.prototype.$store2.get('user');
  if (user) {
    Vue.prototype.$globalState.user = user;
    Vue.prototype.$globalState.reload = 1;
  }


  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');

})();



