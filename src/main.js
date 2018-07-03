import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './fitlers'

// CSS
require('../node_modules/awesomplete/awesomplete.css')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
