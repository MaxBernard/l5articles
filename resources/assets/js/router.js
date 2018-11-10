import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import Services from './views/Services'
import About from './views/About'
import Articles from './components/Articles'
import Users from './components/pages/Users'
import Error_404 from './components/pages/404'

Vue.use(Router)

export default new Router({
  hashbang: false,
  linkActiveClass: 'active',
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { auth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { auth: true }
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles,
      meta: { auth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { auth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { auth: false }
    },
    {
      path: '/services',
      name: 'services',
      component: Services,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {auth: ['admin']}
    },
    {
      path: '/404',
      name: 'error-404',
      component: Error_404
    },
  ],
})
