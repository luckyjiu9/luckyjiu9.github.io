import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',

    component: () => import('../views/layouts/index.vue'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: true
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home/Home.vue'),
        meta: {
          title: '首页',
          keepAlive: true
        },
      },

      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/Cart/Cart.vue'),
        meta: {
          title: '购物车',
          keepAlive: false
        },
      },
      {
        path: '/classify',
        name: 'classify',
        component: () => import('../views/Classify/Classify.vue'),
        meta: {
          title: '分类',
          keepAlive: false
        },
      }
    ]
  },
  {
    path: '/detali',
    name: 'detali',
    component: () => import('../views/Home/Detali.vue'),
    meta: {
      title: '详情页',
      keepAlive: false
    },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Home/Search.vue'),
    meta: {
      title: '搜索',
      keepAlive: false
    },
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/Mine/Mine.vue'),
    meta: {
      title: '关于我',
      keepAlive: false
    },
  },


]

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior (to, from, savedPosition) {
    // console.log("------", to, from, savedPosition, to.meta.savedPosition, "-----")
    // return {x:0,y:0}
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },

})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("vuex");
  //如果有token的话说明你已经登录,让你正常登录
  if (token) {
    next();
  } else {
    //如果没有登录你访问的不是login就让你强制跳转到login页面
    if (to.path !== "/mine") {
      next({ path: "/mine" });
    } else {
      next();
    }
  }
});

export default router
