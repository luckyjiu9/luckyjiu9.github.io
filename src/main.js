import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
//--------rem-------
//-----px转rem的引入-----
//--- 安装：cnpm install lib - flexible postcss - plugin - px2rem--save - dev--
// ---配置rem：main.js 导入： import ‘lib - flexible / flexible’; rem 可以生效了---
// ---配置px—>rem: 创建vue.config.js---
import 'lib-flexible/flexible'
//-------ui--------
//src下创建--ui-->(你引入的ui名字).js
// ------------------------------

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
//vant
import '@/ui/vant'
//element
import '@/ui/element'
//nutui
import '@/ui/nutui'

// 更改title名
import vueWechatTitle from 'vue-wechat-title'
Vue.use(vueWechatTitle)

import axios from 'axios'
Vue.prototype.axios = axios
//css

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
