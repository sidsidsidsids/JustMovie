import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import CreatePage from '../views/CreatePage.vue'
import LoginPage from '../views/LoginPage.vue'
// import DetailPage from '../views/DetailPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
// import FollowPage from '../views/FollowPage.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/profile/:user_id', // user_id를 파라미터로 받음
    name: 'profile',
    component: ProfilePage,
    // meta: { requiresAuth: true } // 인증이 필요한 페이지임을 표시
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.name === 'profile') {
//     // 프로필 페이지에 접근하는 경우
//     const isLogin = router.app.$store.getters.isLogin
//     if (isLogin) {
//       // 로그인되어 있으면 프로필 페이지로 이동
//       next()
//     } else {
//       // 로그인되어 있지 않으면 로그인 페이지로 리다이렉트
//       next('/login')
//     }
//   } else {
//     // 다른 페이지는 인증 체크하지 않음
//     next()
//   }
// })
export default router
