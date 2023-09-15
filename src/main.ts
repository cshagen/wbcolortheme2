import { createApp } from 'vue'
// import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.css'
// import router from './router/index.js'
import { register } from 'swiper/element/bundle';



// Create and mount the root instance.
const app = createApp(App)
// register Swiper custom elements
register();
// app.use(router)
app.mount('#app')

