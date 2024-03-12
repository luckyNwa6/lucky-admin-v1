/*
 * @Author: luckyNwa
 * @Date: 2023-04-17 15:15:08
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/echarts.vue'),
    // component: () => import('../views/test3.vue'),
    // component: () => import('../views/gojs.vue'),
    // component: () => import('../views/date.vue'),
    // component: () => import('../views/yzm.vue'),
    // component: () => import('../views/mock.vue'),
    // component: () => import('../views/excel.vue'),
    // component: () => import('../views/excelDeal.vue'),
    // component: () => import('../views/layout.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
