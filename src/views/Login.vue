<template>

    <div class="login">
       <h1 class="login_heading">Login</h1>
       <form @submit.prevent ="Login">
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
       
       <input class="submit_bt" type="submit" value="Login">
       <p>Need an Account? <router-link class="link" to="/signup">Register Here</router-link></p>

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
        
        const Login = (e) =>{
           
            firebase
            .auth()
            .signInWithEmailAndPassword(email.value,password.value)
            
            .catch(err => alert(err.message));
        }
        return{
            Login,email,password
}
     }
}
</script>
     
<style scoped>
@import "https://use.fontawesome.com/releases/v5.5.0/css/all.css";

.login{
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: white;
}
 .login_heading{
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