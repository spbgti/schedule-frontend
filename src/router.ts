import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import SchedulePage from "./views/SchedulePage.vue"
import ScheduleEdit from "./views/ScheduleEdit.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/schedule/:id/:type",
      name: "Schedule",
      component: SchedulePage,
    },
    {
      path: "/exercises/:ex_id/edit",
      name: "ScheduleEdit",
      component: ScheduleEdit,
    },
  ]
});
