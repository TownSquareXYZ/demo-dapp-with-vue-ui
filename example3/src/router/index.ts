import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const Home = () => import("../views/Home.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "首页",
    },
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;