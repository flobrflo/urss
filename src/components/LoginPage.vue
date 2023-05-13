<template>
  <div class="login">
    <h2>Login</h2>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="login">Sign in</button>
  </div>
</template>

<script>
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

  export default {
    name: "LoginPage",
    data() {
      return {
        email: "",
        password: ""
      };
    },
    methods: {
      login: function() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in 
            console.log('user register :', userCredential.user);
            this.$router.replace("dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      }
    }
  };
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
.login {
  margin-top: 50px;
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
p {
  margin-top: 50px;
  font-size: 16px;
}
p a {
  cursor: pointer;
}
</style>