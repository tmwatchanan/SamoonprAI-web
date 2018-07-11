import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vmodal from 'vue-js-modal'
// import './fitlers'

// CSS
// require('../node_modules/awesomplete/awesomplete.css')

Vue.use(vmodal)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
