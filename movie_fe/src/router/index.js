import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'
import CreatePage from '../views/CreatePage.vue'
import LoginPage from '../views/LoginPage.vue'
import DetailPage from '../views/DetailPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
// import FollowPage from '../views/FollowPage.vue'
import CommunityPage from '../views/CommunityPage.vue'
import SettingsPage from '../views/SettingsPage.vue'
import HelpPage from '../views/HelpPage.vue'
import EditPage from '../views/EditPage.vue'
import EntrancePage from '../views/EntrancePage.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'entrance',
    component: EntrancePage
  },
  {
    path: '/home',
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
    path: '/profile/:id', // user_id를 파라미터로 받음
    name: 'profile',
    component: ProfilePage,
    // meta: { requiresAuth: true } // 인증이 필요한 페이지임을 표시
  },
  {
    path: '/detail/:movie_id', // movie_id를 파라미터로 받음
    name: 'detail',
    component: DetailPage,
    // meta: { requiresAuth: true } // 인증이 필요한 페이지임을 표시
  },
  {
    path: '/community',
    name: 'community',
    component: CommunityPage
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage
  },
  {
    path: '/help',
    name: 'help',
    component: HelpPage
  },
  {
    path: '/edit',
    name: 'edit',
    component: EditPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  options: {
    ignoreDuplicates: true
  }
})

router.beforeEach((to, from, next) => {
  const login_now = store.getters.isLogin
  if (to.path === '/home' || to.path === '/create' || to.path === '/help' || to.path === '/' || to.path === '/login') {
    // '/' 또는 '/create' 경로로 이동하려고 할 때는 이동을 허용합니다.
    next();
  } else if (login_now) {
    // 로그인 상태인 경우 이동을 허용합니다.
    next();
  } else {
    if (to.path !== '/login') {
      alert('로그인 후 이용 가능합니다')
      // 로그인하지 않은 상태이면 '/login'으로 리다이렉트합니다.
      router.push('/login');
    } else {
      next();
    }
  }
});
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
