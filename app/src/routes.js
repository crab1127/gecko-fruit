import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  // 首页
  {
    path: '/',
    name: 'project',
    component: require('./views/project')
  },
  {
    path: '/add-project',
    name: 'add-project',
    component: require('./views/add-project')
  },
  // 项目详情
  {
    path: '/detail',
    name: 'detail',
    component: require('./views/detail')
  },
  {
    name: 'assets',
    path: '/assets',
    component: require('./views/assets')
  },
  {
    name: 'set',
    path: '/set',
    component: require('./views/set')
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