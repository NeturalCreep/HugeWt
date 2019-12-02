import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import less from 'less'
import axios from 'axios'
import Main from '../components/Main.vue'

Vue.use(VueRouter)
Vue.use(less)
Vue.prototype.$ajax = axios

const routes = [
  {
    path: '',
    name: 'default',
    component: Login
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    next()
  } else {
    if (localStorage.getItem('token') != null) {
      next()
    } else {
      Vm.$message({
        message: '请先登录！',
        type: 'warning'
      })
      next({ path: '/Login' })
    }
  }
})
let Vm
const Router = {
  router: router,
  init: (vm) => {
    Vm = vm
  }
}
export default {
  Router
}
