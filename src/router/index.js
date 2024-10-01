import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { // 首页界面，也是我要购买界面，同时为默认页面
      path: '/',
      name: 'homeDefault',
      component: HomeView
    },
    { // 首页界面，也是我要购买界面
      path: '/home',
      name: 'home',
      component: HomeView
    },
    { // 登录与注册界面
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/LoginView.vue')
      component: LoginView
    }
  ]
})

export default router
