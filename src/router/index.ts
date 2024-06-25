import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const HelloWorld = () => import("../components/HelloWorld.vue");
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
  {
    path: "/helloworld",
    name: "helloworld",
    meta: {
      title: "helloworld",
    },
    component: HelloWorld,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;