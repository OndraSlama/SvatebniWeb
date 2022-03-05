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
    path: "/home",
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
});

export default router;