<template>
  <section>
    <h1>Login</h1>
    <div v-if="loggingUp" class="text-center">
      <img src="../assets/Pulse-1s-200px.svg" alt="loader">
    </div>
    <div v-if="errorMessage" class="alert alert-danger">
      <strong>Oh snap!</strong> {{ errorMessage }}
    </div>
    <form v-if="!loggingUp" @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="user.username"
          type="text"
          class="form-control"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter your username"
          required>
        <small
          id="usernameHelp"
          class="form-text text-muted">Enter your username
        </small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          id="password"
          aria-describedby="passwordHelp"
          placeholder="Enter your password"
          required>
        <small
          id="passwordHelp"
          class="form-text text-muted">Enter your password
        </small>
      </div>
      <button type="submit" class="btn btn-outline-warning">Login</button>
    </form>
  </section>
</template>

<script>
import Joi from 'joi';

const LOGIN_URL = 'http://localhost:5050/auth/login';

const schema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(new RegExp('^[a-zA-Z0-9_]+$'))
    .min(2)
    .max(30)
    .required(),
  password: Joi.string()
    .trim()
    .pattern(new RegExp('^[a-zA-Z0-9@#$%^&*]{8,30}$'))
    .required(),
});

export default {
  data: () => ({
    user: {
      username: '',
      password: '',
    },
    errorMessage: '',
    loggingUp: false,
  }),
  watch: {
    user: {
      deep: true,
      handler() {
        this.errorMessage = '';
      },
    },
  },
  methods: {
    async login() {
      this.errorMessage = '';
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        this.loggingUp = true;
        const response = await fetch(LOGIN_URL, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          localStorage.token = result.token;
          setTimeout(() => {
            this.loggingUp = false;
            this.$router.push('/dashboard');
          }, 3000);
        } else {
          const error = await response.json();
          setTimeout(() => {
            this.loggingUp = false;
            this.errorMessage = error.message;
          }, 3000);
        }
      }
    },
    validUser() {
      const { error } = schema.validate(this.user);
      if (error === undefined) {
        // valid user
        return true;
      }
      if (error.message.includes('username')) {
        this.errorMessage = 'Username is invalid.';
      } else {
        this.errorMessage = 'Password is invalid.';
      }
      return false;
    },
  },
};
</script>

<style lang="css" scoped>

</style>
