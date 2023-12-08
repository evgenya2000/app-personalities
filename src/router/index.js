import Vue from "vue";
import VueRouter from "vue-router";
import UsersList from "../components/UsersList.vue";
import UserDetails from "../components/UserDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/users",
  },
  {
    path: "/users",
    component: UsersList,
  },
  {
    path: "/user-details/:id/:pageType",
    name: "user-details",
    component: UserDetails,
  },
];

export default new VueRouter({
  mode: "history",
  routes,
});
