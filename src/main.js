import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Routes from "./routes";
import firebase from "firebase";
import store from "./store";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

var firebaseConfig = {
  apiKey: "AIzaSyAeo9aBOIGK3w5jJ1H8Lyuku2bdvKU-4uo",
  authDomain: "todolist-29eb7.firebaseapp.com",
  databaseURL: "https://todolist-29eb7-default-rtdb.firebaseio.com",
  projectId: "todolist-29eb7",
  storageBucket: "todolist-29eb7.appspot.com",
  messagingSenderId: "165903273782",
  appId: "1:165903273782:web:4d6606cedb20a4dfd22d97",
  measurementId: "G-M7FNTLQBDT",
};
Vue.use(VueRouter);
const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
  store.commit("updateUser", { user });
});

new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store,
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((routeRecord) => routeRecord.meta.authRequired)) {
    if (!store.state.user) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
