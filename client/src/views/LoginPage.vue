<template>
  <div id="login">
    <img
      src="../../public/Verbio.png"
      style="width: 155px; left: 12%"
      alt="Verbio"
    />
    <h2 class="font-semibold color-red margin-bottom">Login Verbio</h2>
    <input
      type="text"
      name="username"
      v-model="input.username"
      placeholder="Username"
      class="inputLogin"
    />
    <input
      type="password"
      name="password"
      v-model="input.password"
      placeholder="Password"
      class="inputLogin"
    />
    <div v-if="alertVisible">
      <p class="error-text">Invalid credentials.</p>
    </div>
    <button
      type="button"
      class="singin"
      :style="{
        backgroundColor:
          this.input.username !== '' && this.input.password !== ''
            ? 'darkseagreen'
            : 'antiquewhite',
      }"
      v-on:click="login()"
    >
      Sign in
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginPage",
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
      alertVisible: false,
    };
  },
  methods: {
    async login() {
      if (this.input.username != "" && this.input.password != "") {
        const postData = {
          username: this.input.username,
          password: this.input.password,
        };
        await axios
          .post("http://localhost:8000/login", postData)
          .then((response) => {
            // Store the Token to manage the session.
            sessionStorage.setItem("Token", response.data);
            // event to show logout button.
            this.$emit("authenticated", true);
            this.$router.replace({ name: "chat" });
          })
          // control the error when have invalid credentials.
          .catch((error) => {
            this.alertVisible = true;
            setTimeout(() => {
              this.alertVisible = false;
            }, 3000);
            console.log(error.response.data);
          });
      } else {
        // A Console log is show when username o password is empty.
        console.log("A username and password must be present");
      }
    },
  },
};
</script>

<style scoped>
#login {
  width: 250px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  padding: 20px;
  column-count: 1;
  display: grid;
  border-radius: 10px;
}
.font-semibold {
  font-weight: bolder;
}
.color-red {
  color: rgb(255, 31, 88);
  padding-left: 39px;
}
.margin-bottom {
  margin-bottom: 10px;
}
.inputLogin {
  background-color: aliceblue !important;
  border-radius: 5px;
  border: 1px dotted gray !important;
  color: black !important;
  font-weight: 600;
}
.singin {
  height: 37px;
  /* background-color: darkseagreen; */
  border: 0px;
  color: black;
  border-radius: 25px;
  font-weight: bold;
}
.error-text {
  color: red;
  font-weight: 500;
  padding-bottom: 10px;
  padding-left: 16%;
  padding-right: 16%;
}
</style>
