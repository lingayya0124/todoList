<template>
  <div class="home">
  <h1>Welcome {{name}}</h1>
  <br>
<button class="logout_bt" @click="Logout">Logout</button>
  </div>
</template>

<script>
import {ref,onBeforeMount} from 'vue';
import firebase from 'firebase';
export default {
  setup(){
  
    const name = ref("");
   onBeforeMount(()=>{
       const user =  firebase.auth().currentUser;
     if (user) {
       name.value = user.email.split('@')[0];
       
     }
   });

   const Logout = () =>
   {
     firebase
     .auth()
     .signOut()
     .then(()=>console.log('Signed out'))
     .catch(err => alert(err.message));
   }

    return{name,Logout}

  }

}
</script>

<style scoped>
.home{
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: white;
}
h1{
  color:  #4caf50;;
}
.logout_bt{
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