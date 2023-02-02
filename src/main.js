import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.prototype.$axios = axios // axios를 import 해온 뒤, 전역변수로 선언. 이때 $axios가 아니라 그냥 prototype.axios해도 되는데 프로젝트 안 레거시를 맞추기 위해 붙임
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
