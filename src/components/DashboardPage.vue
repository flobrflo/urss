<template>
  <div class="dashboard">
    <button @click="logout">Sign Out</button>
  </div>
</template>


<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "DashboardPage",
  methods: {
    logout: function() {
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log('user successfuly disconnected');
        this.$router.replace("login");
      }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    }
  }
};
</script>
