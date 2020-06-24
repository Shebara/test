<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        test
      </h1>
      <div class="links">
        <form v-if="!$store.state.loggedIn" @submit.prevent="login">
          <input type="text" placeholder="Email" v-model="email" :class="{ 'error': $v.email.$error }" />
          <input type="password" placeholder="Password" v-model="password" :class="{ 'error': $v.password.$error }">
          <button type="submit">Log in</button>
        </form>
        <div v-else>Logged in.</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import {required, email} from 'vuelidate/lib/validators';

Vue.use(Vuelidate)

export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    validations: {
        email: {
            required,
            email: email
        },
        password: {
            required,
        }
    },
    methods: {
        async login() {
            this.$v.$touch();

            const result = await axios.post(`http://localhost:5000/api/login`, {
                email: this.email,
                password: this.password
            });

            if (result.data.token) {
                this.$store.commit('logIn');
                this.$store.commit('auth/setToken', {token: result.data.token});
            } else {
                alert('BAD CREDENTIALS!');
            }
            
        }
    }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

input.error {
  border-color: red;
  background-color: lightpink;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
