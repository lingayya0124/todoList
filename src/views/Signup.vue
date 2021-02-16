<template>
    <div class="signup">
       <h1 class="signup_heading">Sign Up</h1>
       <form @submit.prevent="Signup">
           <div class="textbox">
                  <i class="fas fa-user"></i>
       <input type="text" placeholder="Email" v-model="email"/>
           </div>
           <br>
       <div class="textbox">
          <i class="fas fa-lock"></i>
       <input type="password" placeholder="Password" v-model="password"/>
       </div>
       <br>
       <input class="submit_bt" type="submit" value="Signup">
       <p>Have an Account? <router-link class="link" to="/login">Login Here</router-link></p>

       </form>
    </div>
</template>

<script>
import {ref} from 'vue';
import firebase from 'firebase';
export default {
     setup(){
        const email = ref("");
        const password = ref("");
        
        const Signup = () =>{
            firebase
            .auth()
            .createUserWithEmailAndPassword(email.value,password.value)
         
            .catch(err => alert("Wrong Credential"));
        }
        return{
            Signup,email,password
}
     }
}
</script>
     
<style scoped>
@import "https://use.fontawesome.com/releases/v5.5.0/css/all.css";

.signup{
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: white;
}
 .signup_heading{
  float: left;
  font-size: 40px;
  border-bottom: 6px solid #4caf50;
  margin-bottom: 50px;
  padding: 13px 0;
}
.textbox{
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 1px solid #4caf50;
}
.textbox i{
  width: 26px;
  float: left;
  text-align: center;
}
.textbox input{
  border: none;
  outline: none;
  background: none;
  color: white;
  font-size: 18px;
  width: 80%;
  float: left;
  margin: 0 10px;
}
.submit_bt{
  width: 100%;
  background: none;
  border: 2px solid #4caf50;
  color: white;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 12px 0;
} 
.link{
  color: #4caf50;
}
</style>