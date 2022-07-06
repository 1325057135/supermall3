import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "@/router";
import toast from '@/components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from "vue-lazyload";
Vue.config.productionTip = false
//安装toast插件
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})


new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')

