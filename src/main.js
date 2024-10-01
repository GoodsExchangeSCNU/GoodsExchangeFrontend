import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import i18n from './vue_i18n/index.js'

axios.defaults.baseURL = "http://127.0.0.1:5000/api/v1.0"
axios.defaults.withCredentials = true

const app = createApp(App)

// 路由守卫
router.beforeEach((to, from, next) => {
  // 如果没有token，并且当前目标页面不是登录页
  if (!localStorage.getItem("token") && to.path !== "/login") {
    next("/login");  // 重定向到登录页面
  } else {
    next();  // 否则继续访问目标页面
  }
});

app.use(router)
app.use(VueAxios, axios)
app.use(i18n)

app.mount('#app')
