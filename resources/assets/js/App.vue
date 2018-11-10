<template>
  <div v-if="$auth.ready() && loaded">
    <navbar></navbar>
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
  <div v-else>
    <div style="text-align:center; padding-top:50px;">
      Loading site...
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  data() {
    return {
      context: 'app context',
      loaded: false
    }
  },
  mounted() {
    var _this = this;
    // Set up $auth.ready with other arbitrary loaders (ex: language file).
    setTimeout(function () {
      _this.loaded = true;
    }, 500);
  },
  created() {
    var _this = this;
    this.$auth.ready(function () {
      console.log('ready ' + this.context);
    });
    // Vue.http.interceptors.push(function (req, next) {
    //     next(function (res) {
    //         if ( ! res.ok) {
    //             _this.$router.push({name: 'error-502'})
    //         }
    //     });
    // });
  },
  components: {
    Navbar,
  },
};
</script>


<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
