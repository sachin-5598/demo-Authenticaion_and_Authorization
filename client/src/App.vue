<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-warning">
      <router-link
        :to="{ name: 'Home' }"
        class="navbar-brand">Auth-From-Scratch</router-link>
    </nav>
    <router-view class="container mt-2"/>
  </div>
</template>

<style>

</style>
