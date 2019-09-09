import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import router1 from '../components/router1'
import router2 from "../components/router2"
import store from "../components/store"
import Main1 from '../components/ContentMain'
import faceDetect from '../components/Baidu/FaceDetect'
import orc from '../components/Baidu/orc'
import stores from '../store'
import user from '../components/user'
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main1',
      component: Main1,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'router1/:id',
          component: router1,
          props: true
        },
      ]
    },
    {
      path: "/router1",
      name: "router1",
      component: router1
    },
    {
      path: "/router2",
      component: router2
    },
    {
      path: '/store',
      component: store
    },
    {
      path: '/faceDetect',
      component: faceDetect
    },
    {
      path: '/orc',
      component: orc
    },
    {
      path: '/user',
      component: user
    }
  ]
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    const token = localStorage.getItem('Authorization');
    // console.log("2",token);
    if (token === null || token === '') {
      // next('/login');
      stores.commit("changeLogin", true)
    } else {

      next();
    }
  }
});

export default router

