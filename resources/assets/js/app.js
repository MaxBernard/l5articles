
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store/index'

//window.Vue = require('vue')

sync(store, router)

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('articles', require('./components/Articles.vue'))
Vue.component('navbar', require('./components/Navbar'))
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})

Vue.router = router

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
//axios.defaults.baseURL = 'http://localhost:8000/api';
Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
})

/*
const app = new Vue({
  el: '#app',
  store,
  router
})
*/

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

