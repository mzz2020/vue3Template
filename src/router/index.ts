import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    // redirect: '/videolist',
    component: Home,
    children: [
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { commit, getters, dispatch } = store
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (to.matched.length === 0) {
    from.path ? next({ path: from.path }) : next('/')
  } else {
    if (!getters.getLogin) {
      if (getters.getToken) {
        await dispatch('fetchVerificationUser').then(data => {
          if (data && data.result) {
            commit('setUser', data.result)
            if (redirectAlreadyLogin) {
              next({ path: '/' })
            } else {
              next()
            }
          } else {
            commit('setLoginOut')
            next({ path: '/wechatlogin' })
          }
        }).catch(() => {
          commit('setLoginOut')
          next({ path: '/wechatlogin' })
        })
      } else {
        if (requiredLogin) {
          next({ path: '/wechatlogin' })
        } else {
          next()
        }
      }
    } else {
      next()
    }
  }
})

export default router
