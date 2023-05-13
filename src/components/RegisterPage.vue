<template>
  <div class="register">
    <p>Register</p>
    <input type="text" v-model="email" placeholder="Email">
    <br>
    <input type="password" v-model="password" placeholder="Password">
    <br>
    <button @click="register">Register</button>
    <span><router-link to="/login">login</router-link>.
    </span>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    register: function() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(
          userCredential => {
            // Signed Up
            console.log('user register :', userCredential.user);
            this.$router.replace("dashboard");
          },
          error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          }
        );
    }
  }
};
</script>

<style scoped>
.register {
  margin-top: 40px;
}
input {
  width: 40%;
  padding: 20px;
  margin: 20px 0;
}
button {
  width: 10%;
  margin-top: 30px;
  padding: 20px;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>