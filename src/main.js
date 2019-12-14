import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import Axios from 'axios'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    AllDataBase: undefined
  },
  mutations: {
    SetDataBase: function (GetObject, databases) {
      console.log(GetObject, databases)
      GetObject.AllDataBase = databases
    }
  },
  strict: true
})
const EventBus = new Vue({
  data: {
    tableView: undefined,
    Router: undefined
  },
  created () {
    this.$on('setpath', (arg) => {
      console.log('接收到跨组件交互请求:[')
      console.log('请求数据:' + arg)
      console.log('要执行的组件:')
      console.log(this.tableView)
      if (this.tableView !== undefined) {
        console.log('-----------------开始跨组件交换---------------')
        this.tableView.Update(arg)
        console.log('-----------------结束跨组件交换---------------')
      }
      console.log(']')
    })
    this.$on('setTableView', (arg) => {
      console.log(arg)
      this.tableView = arg
      console.log('----------------------------------')
    })
  }
})
Router.router.events = EventBus
console.log('Vue 数据总线 注册完毕')
Vue.prototype.$ajax = Axios
Vue.use(ElementUI)
new Vue({
  store,
  router: Router.router,
  render: h => h(App)
}).$mount('#app')
