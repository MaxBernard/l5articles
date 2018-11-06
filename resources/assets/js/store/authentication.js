import router from '../router';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    registerName: 'John Doe',
    registerEmail: 'new.user@example.com',
    registerPassword: '',
    passwordConf: '',
    registerError: '',
    loginEmail: 'john.doe@example.com',
    loginPassword: '123456',
    loginError: '',
    token: null,
  },
  actions: {
    register({ commit, state }) {
      console.log('Register: ', state.registerName, state.registerEmail, state.registerPassword);
      commit('setRegisterError', '');
      return HTTP().post('auth/register', {
        name: state.registerName,
        email: state.registerEmail,
        password: state.registerPassword,
        password_confirmation: state.passwordConf
      })
      .then(({ data }) => {
        commit('setToken', data.token);
        router.push('/articles');
      })
      .catch((error) => {
        console.log('Error: ', error)
        commit('setRegisterError', '');
      });
    },
    login({ commit, state }) {
      console.log('Login: ', state.loginEmail, state.loginPassword)
      commit('setLoginError', '');
      return HTTP().post('auth/login', {
        email: state.loginEmail,
        password: state.loginPassword
      })
      .then(({ data }) => {
        commit('setToken', data.token);
        router.push('/articles');
      })
      .catch((error) => {
        commit('setLoginError', error);
      });
    },
    logout({ commit }) {
      commit('setToken', null);
      router.push('/login');
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRegisterError(state, error) {
      state.registerError = error;
    },
    setRegisterName(state, name) {
      state.registerName = name;
    },
    setRegisterEmail(state, email) {
      state.registerEmail = email;
    },
    setRegisterPassword(state, password) {
      state.registerPassword = password;
    },
    setPasswordConf(state, password) {
      state.passwordConf = password;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setLoginEmail(state, email) {
      state.loginEmail = email;
    },
    setLoginPassword(state, password) {
      state.loginPassword = password;
    },
  },
};
