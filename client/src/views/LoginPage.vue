<template>
  <div id="login">
    <img
      src="../../public/Verbio.png"
      style="width: 155px; left: 12%"
      alt="Verbio"
    />
    <h2 class="font-semibold color-red">Login Verbio</h2>
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
    };
  },
  methods: {
    async login() {
      if (this.input.username != "" && this.input.password != "") {
        const postData = {
          username: this.input.username,
          password: this.input.password,
        };
        const { data } = await axios.post(
          "http://localhost:8000/login",
          postData
        );
        // Store the Token to manage the session.
        sessionStorage.setItem("Token", data);
        this.$emit("authenticated", true);
        this.$router.replace({ name: "chat" });
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
</style>
