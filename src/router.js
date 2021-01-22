import Vue from 'vue'
import Router from 'vue-router'
// import AuthRequired from './utils/AuthRequired'
import AuthAdminRequired from '@/utils/AuthAdminRequired'
import AuthUserRequired from '@/utils/AuthUserRequired'
import Guest from '@/utils/Guest'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () =>
      import ('./views/user/Home'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/app',
    component: () =>
      import (/* webpackChunkName: "app" */ './views/app'),
    beforeEnter: AuthAdminRequired,
    redirect: '/app/admin/dashboard',
    children: [
      {
        path: 'admin',
        component: () =>
          import (/* webpackChunkName: "admin" */ './views/app/admin/index'),
        // beforeEnter: AuthAdminRequired,
        redirect: '/app/admin/dashboard',
        children: [
          {
            path: 'dashboard',
            component: () =>
              import (/* webpackChunkName: "admin" */ './views/app/admin/Dashboard')
          },
          {
            path: 'transaction',
            component: () =>
              import (/* webpackChunkName: "admin" */ './views/app/admin/Transaction')
          }
        ]
      }]
  },
  {
    path: '/laundry_detail/:id',
    name: 'LaundryDetail',
    props: true,
    component: () =>
        import (/* webpackChunkName: "user" */ './views/user/LaundryDetail.vue')
  },
  {
    path: '/user',
    component: () =>
      import (/* webpackChunkName: "user" */ './views/user/index'),
    beforeEnter: AuthUserRequired,
    children: [
      {
        path: '/order',
        name: 'OrderForm',
        props: true,
        component: () =>
          import (/* webpackChunkName: "user" */ './views/user/OrderForm.vue')
      },
      {
        path: '/success',
        name: 'Success',
        component: () =>
          import (/* webpackChunkName: "user" */ './views/user/Success.vue')
      },
      {
        path: '/history',
        name: 'History',
        component: () =>
          import (/* webpackChunkName: "user" */ './views/user/History.vue')
      }
    ]
  },
  {
    path: '/error',
    component: () =>
      import (/* webpackChunkName: "error" */ './views/Error')
  },
  {
    path: '/auth',
    component: () =>
      import (/* webpackChunkName: "auth" */ './views/auth'),
    redirect: '/auth/login',
    beforeEnter: Guest,
    children: [
      {
        path: 'login',
        component: () =>
          import (/* webpackChunkName: "auth" */ './views/auth/Login')
      },
      {
        path: 'register',
        component: () =>
          import (/* webpackChunkName: "auth" */ './views/auth/Register')
      },
      {
        path: 'forgot-password',
        component: () =>
          import (/* webpackChunkName: "auth" */ './views/auth/ForgotPassword')
      }
    ]
  },
  {
    path: '*',
    component: () =>
      import (/* webpackChunkName: "error" */ './views/Error')
  }
]

const router = new Router({
  linkActiveClass: 'active',
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
