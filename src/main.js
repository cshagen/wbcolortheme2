import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.css'

Vue.config.productionTip = false
// Event Bus
export const eventBus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')

