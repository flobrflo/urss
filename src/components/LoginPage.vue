<template>
  <form @submit="login" class="login">
    <h2>Login</h2>
    <div class="form-row">
      <input type="email" v-model="email" placeholder="Email" required>
    </div>

    <div class="form-row">
      <input type="password" v-model="password" placeholder="Password" required>
    </div>

    <div class="form-row">
      <input type="submit" value="Sign In" class="submit-btn"/>
    </div>
  </form>
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
      login: function(e) {
        e.preventDefault();
        e.stopPropagation();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            console.log('user signin :', userCredential.user);
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40px;
}
.form-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
input {
  width: 40%;
  padding: 20px;
  margin: 20px 0;
}
.submit-btn {
  width: 10%;
  margin-top: 30px;
  padding: 20px;
  cursor: pointer;
}
</style>