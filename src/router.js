import Vue from 'vue'
import Router from 'vue-router'
import AuthRequired from '@/utils/AuthRequired'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('./views/app'),
    redirect: '/app',
    beforeEnter: AuthRequired,
    children: [
      // {
      //   path: 'app/piaf',
      //   component: () => import('./views/app/piaf'),
      //   redirect: '/app/piaf/start',
      //   children: [
      //     { path: 'start', component: () => import('./views/app/piaf/Start') }
      //   ]
      // }
      {
        // IsAdmin
        path: 'app',
        component: () => import('./views/app/admin/index'),
        redirect: '/admin/dashboard',
        children: [
          {
            path: '/admin/dashboard',
            component: () => import('./views/app/admin/Dashboard')
          },
          {
            path: '/admin/transaction',
            component: () => import('./views/app/admin/Transaction')
          }
        ]
      }
    ]
  },
  { path: '/error', component: () => import(/* webpackChunkName: "error" */ './views/Error') },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ './views/user'),
    redirect: '/user/login',
    children: [
      { path: 'login', component: () => import(/* webpackChunkName: "user" */ './views/user/Login') },
      { path: 'register', component: () => import(/* webpackChunkName: "user" */ './views/user/Register') },
      { path: 'forgot-password', component: () => import(/* webpackChunkName: "user" */ './views/user/ForgotPassword') }
    ]
  },
  { path: '*', component: () => import(/* webpackChunkName: "error" */ './views/Error') }
]

const router = new Router({
  linkActiveClass: 'active',
  routes,
  mode: 'history'
})

export default router
