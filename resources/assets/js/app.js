
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');

import App from './App.vue';
import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store/index';

window.Vue = require('vue');

sync(store, router);

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

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
