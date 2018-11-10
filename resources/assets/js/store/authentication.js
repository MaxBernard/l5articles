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
      .then( res => {
        const token = res.data.token
        commit('setToken', token)
        router.push('/articles')
      })
      .catch((err) => {
        console.log('Error: ', err)
        commit('setRegisterError', err)
      })
    },
    login({ commit, state }) {
      console.log('Login: ', state.loginEmail, state.loginPassword)
      commit('setLoginError', '');
      return HTTP().post('auth/login', {
        email: state.loginEmail,
        password: state.loginPassword
      })
      .then( res => {
        const token = res.data.token
        commit('setToken', token)
        router.push('/articles')
      })
      .catch((err) => {
        commit('setLoginError', err);
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
    setRegisterError(state, err) {
      state.registerError = err;
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
