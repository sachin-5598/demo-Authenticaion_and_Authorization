<template>
<div class="home text-center">
  <div class="jumbotron">
    <h1 class="display-3">Authentication & Authorization</h1>
    <p class="lead">Implementing Auth from scratch for fun</p>
    <hr class="my-4">
    <p>It uses Node, Express, MongoDB, Vuejs</p>
    <img v-if="initialLoading" src="../assets/Gear-0.8s-200px.svg" alt="retrieving">
    <p v-if="!initialLoading" class="lead">
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
        role="button">Dashboard</router-link>
    </p>
  </div>
</div>
</template>

<script>
const API_URL = 'http://localhost:5050/auth';
export default {
  name: 'Home',
  data: () => ({
    isLoggedIn: false,
    initialLoading: true,
  }),
  async mounted() {
    if (localStorage.token) {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        if (result.user) {
          // valid token
          this.isLoggedIn = true;
        } else {
          localStorage.removeItem('token');
          this.isLoggedIn = false;
        }
      } else {
        localStorage.removeItem('token');
        this.isLoggedIn = false;
      }
    }
    setTimeout(() => {
      this.initialLoading = false;
    }, 1000);
  },
};
</script>

<style lang="css" scoped>
  a {
    margin: 0px 1vw;
  }
</style>
