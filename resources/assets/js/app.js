
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
import VueAuth from '@websanova/vue-auth'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import Editor from '@tinymce/tinymce-vue'
import App from './App'
import router from './router'
import store from './store/index'

//window.Vue = require('vue')

sync(store, router)

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('articles', require('./components/Articles.vue'))
//Vue.component('navbar', require('./components/Navbar'))
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
  `
})

Vue.router = router

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'http://l5articles.purotracker.com/api'

Vue.use(VueAuth, {
  auth:   require('@websanova/vue-auth/drivers/auth/bearer.js'), 
  http:   require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
})

//Vue.use( CKEditor )

/*
const app = new Vue({
  router,
  store,
  tinymce: Editor,
  el: '#app',
})
*/

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

/*
const app = new Vue({
  components: {
    router: router,
    store: store,
    //tinymce: Editor,
  },  
  render: h => h(App),
}).$mount('#app')
*/
