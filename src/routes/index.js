import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

export default [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",

    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",

    component: Signup,
  },
];
