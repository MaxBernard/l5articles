<template>
  <header class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <!-- Collapsed Hamburger -->
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
          <span class="sr-only">Toggle Navigation</span>
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Branding Image -->
        <router-link class="navbar-brand" to="/">L5Articles</router-link>
      </div>

      <div class="collapse navbar-collapse" id="app-navbar-collapse">
        <!-- Left Side Of Navbar -->
        <ul class="nav navbar-nav"> &nbsp; </ul>
        <ul class="nav navbar-nav">
          <li>
            <router-link v-if="$auth.check()" to="/home">
              <span class="glyphicon glyphicon-home"></span> Home
            </router-link>
          </li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/services">Services</router-link></li>
          <li v-if="$auth.check()"><router-link to="/articles">Articles</router-link></li>
        </ul>
        <!-- Right Side Of Navbar -->  <!-- Authentication Links -->
        <ul class="nav navbar-nav navbar-right">
          <li v-if="!$auth.check()"><router-link to="/login">
            <span class="glyphicon glyphicon-log-in"></span> Login</router-link>
          </li>
          <li v-if="!$auth.check()"><router-link to="/register">
            <span class="glyphicon glyphicon-user"></span> Register</router-link>
          </li>
          <li v-if="$auth.check()">
            <a href="#" @click.prevent="logout">
              <span class="glyphicon glyphicon-log-out"></span> Logout
            </a>
          </li>
        </ul>
      </div>

    </div>
  </header>
</template>

<script>
//import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      context: 'app context',
      loaded: false
    }
  },
  computed: {
    //...mapGetters('authentication', [
    //  'isLoggedIn',
    //]),
  },
  methods: {
    //...mapActions('authentication', [
    //  'logout',
    //]),
    logout() {
      this.$auth.logout({
        makeRequest: true,
        success() {
          console.log('Success: ' + this.context);
        },
        error() {
          console.log('Error: ' + this.context);
        }
      });
    },
  },
};
</script>

<style scoped>
.header {
  height: 40px;
  color: white;
  background-color: #cccccc;
}
</style>

