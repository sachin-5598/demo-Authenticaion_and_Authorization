<template>
<div class="home text-center">
  <div class="jumbotron">
    <h1 class="display-3">Authentication & Authorization</h1>
    <p class="lead">Implementing Auth from scratch for fun</p>
    <hr class="my-4">
    <p>It uses Node, Express, MongoDB, Vuejs</p>
    <p class="lead">
      <router-link
        class="btn btn-warning btn-lg"
        :to="{ name: 'Signup' }"
        role="button">SignUp</router-link>
      <a class="btn btn-warning btn-lg" href="#" role="button">LogIn</a>
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="css" scoped>
  a {
    margin: 0px 1vw;
  }
</style>
