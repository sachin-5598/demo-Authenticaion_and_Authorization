<template>
  <section>
    <h1>Dashboard</h1>
    <br>
    <div v-if="!user" class="text-center">
      <h2 class="text-warning">Getting Your Information</h2>
      <img src="../assets/Ellipsis-2s-200px.svg" alt="retrieving">
    </div>
    <h4 v-if="user">Hye!!! {{user.username}}</h4>
    <br>
    <br>
    <button v-if="user" @click="logout" class="btn btn-outline-warning">Logout</button>
  </section>
</template>

<script>
// function parseJwt(token) {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
//     const result = `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
//     return result;
//   }).join(''));
//   return JSON.parse(jsonPayload);
// }
const API_URL = 'http://localhost:5050/auth';
export default {
  data: () => ({
    user: null,
  }),
  async mounted() {
    // const payload = parseJwt(localStorage.token);
    // this.user.username = payload.username;
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
        setTimeout(() => {
          this.user = result.user;
        }, 2000);
      } else {
        this.logout();
      }
    } else {
      this.logout();
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
  },
};
</script>

<style lang="css" scoped>

</style>
