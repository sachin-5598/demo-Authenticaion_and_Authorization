<template>
<div class="home text-center">
  <div class="jumbotron">
    <h1 class="display-3">Authentication & Authorization</h1>
    <p class="lead">Implementing Auth from scratch for fun</p>
    <hr class="my-4">
    <p>It uses Node, Express, MongoDB, Vuejs</p>
    <p class="lead">
      <router-link
        v-if="!isLoggedIn"
        class="btn btn-warning btn-lg"
        :to="{ name: 'Signup' }"
        role="button">SignUp</router-link>
      <router-link
        v-if="!isLoggedIn"
        class="btn btn-primary btn-lg"
        :to="{ name: 'Login' }"
        role="button">LogIn</router-link>
      <router-link
        v-if="isLoggedIn"
        class="btn btn-primary btn-lg"
        :to="{ name: 'Dashboard' }"
        role="button">My Dashboard</router-link>
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    isLoggedIn: false,
  }),
  mounted() {
    if (localStorage.token) {
      this.isLoggedIn = true;
    }
  },
};
</script>

<style lang="css" scoped>
  a {
    margin: 0px 1vw;
  }
</style>
