import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Page1 from '../views/Page1.vue'
import Page2 from '../views/Page2.vue'
import Page3 from '../views/Page3.vue'
import Page4 from '../views/Page4.vue'
import Page5 from '../views/Page5.vue'

//vue add router
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/page-1', // <--- 바뀌는 값 없는 기본 라우팅. '정적 라우터'.
    name: 'page-1',
    component: Page1  // === component: () => import(/* webpackChunkName: "Page1" */ '../views/Page1.vue') // 필요할 때마다 컴파일
  },
  {
    path: '/page-2/:id', // <--- 특정 페이지에 대한 고유값을 파라미터(번호값)라고 한다. 하나의 열쇠라고 보면 된다. 이 파라미터를 동적으로 이어받아서 다음 페이지로 넘어갈 수 있게끔 한다. 이를 '동적 라우터'라고 한다.
    name: 'page-2',
    component: Page2
  },
  {
    path: '/page-3',
    name: 'page-3',
    component: Page3
  },
  {
    path: '/page-4',
    name: 'page-4',
    component: Page4
  },
  {
    path: '/page-5',
    name: 'page-5',
    component: Page5
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

//npm install axios
// axios method : get post put수정 patch수정 delete