import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Description from "../views/Description.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    // path: "/edit/:id",
    path: "/description",
    name: "Description",

    component: Description,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
