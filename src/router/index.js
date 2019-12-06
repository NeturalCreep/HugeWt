import Vue from 'vue'
import Table from '../components/Table.vue'
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
      { path: '/Main/', name: 'Tabledefault', component: Table },
      { path: '/Table/:DATABASE/:TABLENAME', name: 'test', component: Table }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach(function (to, from, next) {
  if (to.name === 'test') {
    if (router.events !== undefined) {
      console.log('检测到路由跳转需求 ')
      router.events.$emit('setpath', to)
    }
    next()
  } else {
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
            if (to.name !== 'test') {
              next()
            } else {
              console.log('报错提示')
              next()
            }
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
  }
})
export default {
  router
}
