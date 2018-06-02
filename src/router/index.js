import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import router1 from '../components/router1'
import router2 from "../components/router2"
import store from "../components/store"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'router1/:id',
          component: router1,
          props:true
        },
        {
          path:"router2",
          component:router2
        },
        {
          path:'store',
          component:store
        }
        ]
    },
    {
      path:"/router1",
      name:"router1",
      component:router1
    }
  ]
})
