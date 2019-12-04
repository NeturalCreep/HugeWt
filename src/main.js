import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import Axios from 'axios'

Vue.prototype.$ajax = Axios
Vue.use(ElementUI)
const app = new Vue({
  router: Router.Router.router,
  render: h => h(App)
}).$mount('#app')
Router.Router.init(app)
