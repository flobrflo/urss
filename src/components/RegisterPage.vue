<template>
  <form @submit="register" class="register">
    <h2>Register</h2>

    <div class="form-row">
      <div class="nomark"></div>
      <input type="email" v-model="email" placeholder="Email">
      <div v-if="email_valid === null" class="nomark"></div>
      <div v-if="email_valid" class="checkmark"></div>
      <div v-if="email_valid != null && !email_valid" class="crossmark"></div>
    </div>

    <div class="form-row">
      <div class="nomark"></div>
      <input type="password" v-model="password" placeholder="Password">
      <div v-if="password_valid === null" class="nomark"></div>
      <div v-if="password_valid" class="checkmark"></div>
      <div v-if="password_valid != null && !password_valid" class="crossmark"></div>
    </div>
    <div class="form-row" v-if="password_valid != null && !password_valid">
      <div class="small">Password need to contain at least 8 caracter: min 1 Uppercase, min 1 Lowercase, min 1 Number and min 1 Special Char.</div>
    </div>

    <div class="form-row">
      <div class="nomark"></div>
      <input type="password" v-model="confirm_password" placeholder="Confirm Password">
      <div v-if="confirm_password_valid === null" class="nomark"></div>
      <div v-if="confirm_password_valid" class="checkmark"></div>
      <div v-if="confirm_password_valid != null && !confirm_password_valid" class="crossmark"></div>
    </div>

    <div class="form-row">
      <input type="submit" value="Register" class="submit-btn"/>
    </div>

    <span><router-link to="/login">login</router-link></span>
  </form>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      email_valid: null,
      password: "",
      password_valid: null,
      confirm_password: "",
      confirm_password_valid: null
    };
  },
  methods: {
    register: function(e) {
      e.preventDefault();
      e.stopPropagation();

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
    },
    validateEmail(email) {
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        this.email_valid = true;
      } else {
        this.email_valid = false;
      }
    },
    validatePassword(password) {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(password)) {
        this.password_valid = true;
      } else {
        this.password_valid = false;
      }
    },
    validateConfirmPassword(password, originalPassword) {
      if (password == originalPassword) {
        this.confirm_password_valid = true;
      } else {
        this.confirm_password_valid = false;
      }
    }
  },
  watch: {
    email (value) {
      this.email = value;
      this.email_valid = null;

      this.validateEmail(value);
    },
    password (value) {
      this.password = value;
      this.password_valid = null;
      this.validatePassword(value);
    },
    confirm_password (value) {
      this.confirm_password = value;
      this.confirm_password_valid = null;
      this.validateConfirmPassword(value, this.password);
    }
  }
};
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40px;
}
.form-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
.small {
  font-size: 12px;
}

.nomark {
  position:relative;
  display:inline-block;
  padding-left: 10px;
  width: 20px;
}
.checkmark {
  position:relative;
  display:inline-block;
  margin-left: 10px;
  width: 20px;
  &:after{
    content: '';
    display: block;
    width: 5px;
    height: 12px;
    border: solid #090;
    border-width: 0 5px 5px 0;
    transform: rotate(45deg);
  }
}
.crossmark {
  position:relative;
  display:inline-block;
  margin-left: 10px;
  width: 20px;
  &:after {
    position: absolute;
    display: block;
    content: '';
    width: 20px;
    height: 0px;
    border: solid #E00;
    border-width: 0 0px 5px 0;
    transform: rotate(45deg);
    left:0;
    top:0;
  }
  &:before {
    position: absolute;
    display: block;
    content: '';
    width: 20px;
    height: 0px;
    border: solid #E00;
    border-width: 0 0px 5px 0;
    transform: rotate(-45deg);
    left:0;
    top:0;
  }
}
</style>