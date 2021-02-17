<template>
  <div class="home">
    <h1>Welcome {{ name }}</h1>
    <br />
    <button class="logout_bt" @click="Logout">Logout</button>
  </div>
</template>

<script>
import router from "vue-router";
import firebase from "firebase";

export default {
  data: function () {
    return {
      name: "",
    };
  },

  beforeMount: function () {
    const user = firebase.auth().currentUser;
    if (user) {
      this.name = user.email.split("@")[0];
    } else {
      this.$router.push("/login");
    }
  },

  methods: {
    Logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    },
  },
};
</script>

<style scoped>
.home {
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
h1 {
  color: #4caf50;
}
.logout_bt {
  width: 100%;
  background: none;
  border: 2px solid #4caf50;
  color: white;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 12px 0;
}
</style>