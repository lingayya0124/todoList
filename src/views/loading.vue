<template></template>
<script>
import Vue from "vue";
import firebase from "firebase";
import router from "vue-router";
import { mapGetters } from "vuex";

export default Vue.extend({
  computed: {
    ...mapGetters(["user"]),
    nextRoute() {
      return this.$route.query.redirect || "/home";
    },
  },

  watch: {
    user: function (changedUser) {
      if (changedUser) {
        this.$router.replace(this.nextRoute);
      } else {
      }
    },
  },
});
</script>