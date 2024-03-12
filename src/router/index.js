/*
 * @Author: luckyNwa
 * @Date: 2023-04-17 15:15:08
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//解决 Vue Router 在使用 router.push() 方法进行导航时可能触发的控制台报错问题
const originalPush = VueRouter.prototype.push
//这里使用了一个自定义的函数来替代原始的 push 方法
VueRouter.prototype.push = function push(location) {
  //当使用 router.push() 方法进行页面导航时，如果导航失败（比如目标路由不存在），不会抛出异常到控制台，而是直接捕获错误并终止异常传播。这样可以避免在开发环境中因为路由导航问题而频繁地显示控制台错误信息，使开发者能够更好地处理和调试错误
  return originalPush.call(this, location).catch((err) => err)
}
const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/bigData',
    name: 'bigData',
    component: () => import('../views/home/bigData.vue'),
  },
  {
    path: '/home', //首页
    name: 'home',
    meta: { title: '首页' },
    redirect: '/index',
    component: () => import('../views/home/index.vue'),
    children: [
      {
        path: '/index', //首页
        name: 'index',
        meta: { title: '首页' },
        component: () => import('../views/home/index/index.vue'),
      },
      {
        path: '/pic', //图片管理
        name: 'pic',
        meta: { title: '图片管理' },
        component: () => import('../views/home/pic/index.vue'),
        children: [
          // {
          //   path: '/oss',
          //   name: 'oss',
          //   meta: { title: 'oss服务' },
          //   component: () => import('../views/home/pic/oss.vue')
          // },
          {
            path: '/picServe',
            name: 'picServe',
            meta: { title: '云服务' },
            component: () => import('../views/home/pic/picServe.vue'),
          },
          // {
          //   path: '/testServe',
          //   name: 'testServe',
          //   meta: { title: '测试服务' },
          //   component: () => import('../views/home/pic/testServe.vue'),
          // },
        ],
      },
    ],
  },
  {
    path: '*', // 匹配所有未定义的路由
    name: 'not-found',
    component: () => import('@/components/NotFound.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
