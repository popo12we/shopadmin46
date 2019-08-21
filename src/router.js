import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Login from './views/login.vue'
import User from './views/user.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/index/user',
      children: [
        {
          path: '/index/user',
          name: 'user',
          component: User
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
