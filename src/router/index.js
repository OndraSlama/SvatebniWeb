import { createWebHistory, createRouter } from "vue-router";
import DoorPage from "../views/DoorPage.vue";
import HomePage from "../views/HomePage.vue";
import NotFound from "../views/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: DoorPage,
  },
  {
    path: "/svatba",
    name: "Home",
    component: HomePage,
  },
  {
	path: "/:catchAll(.*)",
	component: NotFound,
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

export default router;