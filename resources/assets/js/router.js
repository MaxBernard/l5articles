import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './components/pages/Dashboard'
import Home from './components/pages/Home'
import Login from './views/Login'
import Register from './views/Register'
import Services from './components/pages/Services'
import About from './components/pages/About'
import Welcome from './components/pages/Welcome'
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
      name: 'welcome',
      component: Welcome,
      meta: { auth: false }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { auth: true }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles,
      meta: { auth: true }
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
      path: '/user',
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
