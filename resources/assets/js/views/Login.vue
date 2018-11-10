<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="panel panel-default">
          <div class="panel-heading">Login</div>
          <div class="panel-body">

            <div class="alert alert-danger" v-if="error">
              <p>Error: Unable to sign in with those credentials.</p>
            </div>

            <form autocomplete="off" @submit.prevent="login" method="post">

              <div class="form-group">
                <label for="email" class="col-md-4 control-label">Email</label>
                <div class="col-md-6">
                  <custom-input type="email" id="email" name="email" class="form-control" 
                    v-model="email" placeholder="new.user@example.com" 
                    autocomplete="username" required>
                  </custom-input>
                </div>
                <!--span class="help-block" v-if="error && errors.email">{{ errors.email }}</span-->
              </div>

              <div class="form-group">
                <label for="password" class="col-md-4 control-label">Password</label>
                <div class="col-md-6">
                  <custom-input type="password" id="password" name="password" class="form-control" 
                    v-model="password" placeholder="Password" 
                    autocomplete="new-password" required>
                  </custom-input>
                </div>
                <!--span class="help-block" v-if="error && errors.password">{{ errors.password }}</span-->
              </div>

              <div class="form-group">
                <div class="col-md-6 col-md-offset-4">
                  <button type="submit" class="btn btn-primary">
                    <span class="glyphicon glyphicon-log-in"></span> Login
                  </button>
                </div>
              </div>

            </form>
          </div>
          <!--div class="panel-footer clearfix">
            <span v-if="loginError!=''" class="help-block">
              <strong> {{ loginError }} </strong>
            </span>
            <span v-else class="help-block">
              <strong>  </strong>
            </span>
          </div-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data(){
    return {
      email: null,
      password: null,
      error: false
    }
  },
  computed: {
    /*
    ...mapState('authentication', [
      'loginEmail',
      'loginPassword',
      'loginError',
    ]),
    */
  },
  methods: {
    /*
    ...mapMutations('authentication', [
      'setLoginEmail',
      'setLoginPassword',
      'setLoginError'
    ]),
    ...mapActions('authentication', [
      'login',
    ]),
    */
    login() {
      var app = this
      this.$auth.login({
        params: {
          email: app.email,
          password: app.password
        }, 
        success: function () {
        },
        error: function () {
        },
        rememberMe: true,
        redirect: '/articles',
        fetchUser: false,
      })
    },
  },
  // mounted () {this.setLoginError, ''},
};
</script>

<style scoped>
.panel-heading {
  height: 42px;
  font-size: 1.2em;
  color: white;
  background-color: grey;
}

.panel-footer {
  height: 42px;
  font-size: 1.5em;
  color: white;
  background-color: grey;
}

.help-block {
  color: white;
  background-color: brown;
}</style>
