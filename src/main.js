import Vue from 'vue'
// 引入vant
import Vant from 'vant';

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import 'vant/lib/index.css';
import "./assets/font/iconfont.css"
import "swiper/css/swiper.min.css"
Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
