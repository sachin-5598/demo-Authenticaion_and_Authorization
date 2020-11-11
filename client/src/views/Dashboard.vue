<template>
  <section>
    <h1>Dashboard</h1>
    <br>
    <h4>Hye!!! {{user.username}}</h4>
    <br>
    <br>
    <button @click="logout" class="btn btn-outline-warning">Logout</button>
  </section>
</template>

<script>
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
    const result = `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
    return result;
  }).join(''));
  return JSON.parse(jsonPayload);
}
export default {
  data: () => ({
    user: {
      username: '',
    },
  }),
  mounted() {
    const payload = parseJwt(localStorage.token);
    this.user.username = payload.username;
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
