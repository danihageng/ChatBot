import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import LoginPage from "../views/LoginPage.vue";
import ChatPage from "../views/ChatPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: {
        name: "login",
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/Chat",
      name: "chat",
      component: ChatPage,
    },
    // {
    //   path: "/login",
    //   name: "home",
    //   component: LoginPage,
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
