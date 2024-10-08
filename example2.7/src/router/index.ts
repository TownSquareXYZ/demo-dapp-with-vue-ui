import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/',
    name: 'LoginPage',
    component: () =>
      import(/* webpackChunkName: "HomePage" */ '../views/HomePage/HomePage.vue'),
  },
]

const createRouter = () =>
  new VueRouter({
    routes: constantRoutes,
  })

const router = createRouter()

export default router