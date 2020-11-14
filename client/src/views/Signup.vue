<template>
  <section>
    <h1>Signup</h1>
    <div v-if="signingUp" class="text-center">
      <img src="../assets/Pulse-1s-200px.svg" alt="loader">
    </div>
    <div v-if="errorMessage" class="alert alert-danger">
      <strong>Oh snap!</strong> {{ errorMessage }}
    </div>
    <form v-if="!signingUp" @submit.prevent="signup">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="user.username"
          type="text"
          class="form-control"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter username"
          required>
        <small
          id="usernameHelp"
          class="form-text text-muted">Username must longer than 2 characters and shorter than 30.
          Username can only contain alpha numeric character and '_'.
        </small>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            id="password"
            aria-describedby="passwordHelp"
            placeholder="Enter password"
            required>
          <small
            id="passwordHelp"
            class="form-text text-muted">Password must longer than 8 characters.
            Username can only contain alpha numeric character and '@,#,$,%,^,&,*'.
          </small>
        </div>
        <div class="form-group col-md-6">
          <label for="confirmPassword">Confirm Password</label>
          <input
            v-model="user.confirmPassword"
            type="password"
            class="form-control"
            id="confirmPassword"
            aria-describedby="confirmPasswordHelp"
            placeholder="Confirm Password"
            required>
          <small
            id="confirmPasswordHelp"
            class="form-text text-muted">Please confirm your password.
          </small>
        </div>
      </div>
      <button type="submit" class="btn btn-outline-warning">Signup</button>
    </form>
  </section>
</template>

<script>
import Joi from 'joi';

const SIGNUP_URL = 'http://localhost:5050/auth/signup';

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
  confirmPassword: Joi.ref('password'),
});

export default {
  data: () => ({
    user: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    errorMessage: '',
    signingUp: false,
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
    async signup() {
      this.errorMessage = '';
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        // fetch using .then() and .catch() :
        // fetch(SIGNUP_URL, {
        //   method: 'POST',
        //   body: JSON.stringify(body), // change body to text for http
        //   headers: {
        //     'content-type': 'application/json',
        //   },
        // }).then((response) => {
        //   if (response.ok) {
        //     return response.json();
        //   }
        //   response.json()
        //     .then((error) => {
        //       throw new Error('error.message');
        //     });
        // }).then((user) => {
        //   console.log(user);
        // }).catch((error) => {
        //   this.errorMessage = error.message;
        // });
        this.signingUp = true;
        const response = await fetch(SIGNUP_URL, {
          method: 'POST',
          body: JSON.stringify(body), // change body to text for http
          headers: {
            'content-type': 'application/json',
          },
        });
        if (response.ok) {
          // everything went ok
          const result = await response.json();
          localStorage.token = result.token;
          setTimeout(() => {
            this.signingUp = false;
            this.$router.push('/dashboard');
          }, 3000);
        } else {
          // because we are sending json when an error happens too
          const error = await response.json();
          setTimeout(() => {
            this.signingUp = false;
            this.errorMessage = error.message;
          }, 3000);
        }
      }
    },
    validUser() {
      if (this.user.password === this.user.confirmPassword) {
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
      } else {
        this.errorMessage = 'Passwords must match.';
      }
      return false;
    },
  },
};
</script>

<style lang="css" scoped>

</style>
