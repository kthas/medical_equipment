// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import global from './Global'//引用文件

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.GLOBAL = global//挂载到Vue实例上面
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  global,
  components: { App },
  template: '<App/>'
})
