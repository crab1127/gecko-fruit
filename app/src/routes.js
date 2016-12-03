import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  // 首页
  {
    path: '/',
    name: 'landing-page',
    component: require('./views/index')
  },
  // 添加项目
  {
    path: '/add',
    name: 'add-project',
    component: require('./views/add')
  },
  // 项目详情
  {
    path: '/detail',
    name: 'detail',
    component: require('./views/detail')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router