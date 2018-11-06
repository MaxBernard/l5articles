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
      <!--div class="navbar-nav-scroll"-->
        <div class="collapse navbar-collapse" id="app-navbar-collapse">
          <!-- Left Side Of Navbar -->
          <ul class="nav navbar-nav"> &nbsp; </ul>
          <ul class="nav navbar-nav">
            <li><router-link to="/home"><span class="glyphicon glyphicon-home"></span> Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/services">Services</router-link></li>
            <li><router-link v-if="isLoggedIn" to="/api/articles">Articles</router-link></li>
          </ul>
          <!-- Right Side Of Navbar -->
          <!-- Authentication Links -->
          <ul v-if="isLoggedIn" class="nav navbar-nav navbar-right">
            <li><router-link to="/logout">
              <span class="glyphicon glyphicon-log-in"></span> Logout</router-link>
            </li>
          </ul>
          <ul v-else class="nav navbar-nav navbar-right">  
            <li><router-link to="/login">
              <span class="glyphicon glyphicon-log-in"></span> Login</router-link>
            </li>
            <li><router-link to="/register">
              <span class="glyphicon glyphicon-user"></span> Register</router-link>
            </li>
          </ul>
        </div>
      <!--/div-->
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'logout',
    ]),
  },
};
</script>

<style>
.header {
  height: 40px;
  color: white;
  background-color: #cccccc;
}
</style>

