<template>
  <div class="container">
    <div>
      <h1 class="title">
        test
      </h1>
      <div v-if="!$store.state.loaded" class="loading">
        Loading...
      </div>
      <div v-else class="links">
        <form v-if="!$store.state.loggedIn" @submit.prevent="login">
          <input type="text" placeholder="Email" v-model="email" :class="{ 'error': $v.email.$error }" />
          <input type="password" placeholder="Password" v-model="password" :class="{ 'error': $v.password.$error }">
          <button type="submit">Log in</button>
        </form>
        <div v-else>
          <a href="#" @click.prevent="logout">Log out</a>
          <Content />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import {required, email} from 'vuelidate/lib/validators';
import Content from '~/components/Content';

Vue.use(Vuelidate);

export default {
    components: {
        Content
    },
    data() {
        return {
            email: "",
            password: "",
        };
    },
    mounted() {
        if (process.browser) {
            this.$store.dispatch('nuxtClientInit', this.$store);
        }
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
                this.$store.commit('auth/setToken', result.data.token);

                localStorage.setItem('loggedIn', true);
                localStorage.setItem('authToken', result.data.token);
            } else {
                alert('BAD CREDENTIALS!');
            }
            
        },
        logout() {
          this.$store.commit('logOut');

          localStorage.setItem('loggedIn', false);
        }
    }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
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

.links a {
  display: inline-block;
  padding-bottom: 25px;
}
</style>
