import Vue from 'vue';
import VueRouter from "vue-router";
// import home from "../views/home/home";



const Home = () => import('../views/home/home')
const category = () => import('../views/category/category')
const cart = () => import('../views/cart/cart')
const profile = () => import('../views/profile/profile')
const Detail = () => import('../views/detail/Detail')
//1.安装插件
Vue.use(VueRouter)





//2.创建路由对象

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:category
  },
  {
    path:'/cart',
    component:cart
  },
  {
    path:'/profile',
    component:profile
  },

  {
    path:'/detail/:iid',
    component:Detail
  }
]
const router = new VueRouter({
  routes,
  mode:"history"
})

export default router
