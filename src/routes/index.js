import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Loading from "../views/loading.vue";

export default [
  {
    path: "/",
    name: "Login",

    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",

    component: Signup,
  },
  {
    path: "/loading",
    name: "loading",

    component: Loading,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,

    meta: { authRequired: true },
  },
];
