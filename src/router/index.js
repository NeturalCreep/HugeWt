import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import less from 'less'
import axios from 'axios'
import Main from '../components/Main.vue'
import Table from '../components/Table.vue'

Vue.use(VueRouter)
Vue.use(less)
Vue.prototype.$ajax = axios

const routes = [
  {
    path: '/',
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
    component: Main,
    children: [
      { path: '/Table/:id', name: 'test', component: Table }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach(function (to, from, next) {
  if (to.name === 'test') {
    console.log(router.app)
    if (router.app._route !== undefined) {
      console.log(router.app)
      console.log(router.app._route.params.id)
    }
  }
  if (to.name === 'Login' || to.name === 'default') {
    next()
  } else {
    if (localStorage.getItem('token') != null) {
      axios({
        method: 'post',
        url: 'http://localhost:8081/Login',
        data: {
          username: '',
          password: '',
          token: localStorage.getItem('token')
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(response => {
        if (response.data.result) {
          next()
        } else {
          router.app.$message({
            message: '登录已失效',
            type: 'error'
          })
          next({ path: '/Login' })
        }
      })
    } else {
      router.app.$message({
        message: '请先登录！',
        type: 'warning'
      })
      next({ path: '/Login' })
    }
  }
})
const Router = {
  router: router,
  init: (vm) => {
    router.app = vm
  }
}
export default {
  Router
}
