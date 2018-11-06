import createPersistedState from 'vuex-persistedstate';

import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './authentication';
// import projects from './projects';
// import tasks from './tasks';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: 'http://l5articles.homebase.lan',
  },
  modules: {
    authentication,
  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    createPersistedState(),
  ],
});
