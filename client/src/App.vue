<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="app">
    <div id="nav" class="fixTopLeft">
      <router-link
        v-if="authenticated"
        to="/login"
        v-on:click="logout()"
        replace
        class="logoutButton"
        >Logout</router-link
      >
    </div>
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      authenticated: sessionStorage.Token !== undefined ? true : false,
    };
  },
  mounted() {
    if (sessionStorage.Token) {
      this.$router.replace({ name: "chat" });
    }
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
      sessionStorage.removeItem("Token");
    },
  },
};
</script>

<style>
body {
  background-color: #f0f0f0;
}
h1 {
  padding: 0;
  margin-top: 0;
}
#app {
  width: 1024px;
  margin: auto;
}
.fixTopLeft {
  position: fixed;
  top: 30px;
  right: 59px;
}
.logoutButton {
  box-sizing: border-box;
  background-color: orangered;
  color: white;
  border-radius: 6px;
  padding: 17%;
}
</style>
