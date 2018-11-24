<template>
  <div class="container-fluid">
    <!--div class="row"-->
      <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">
          <div class="panel-heading">Register</div>
          <div class="panel-body">

            <div class="alert alert-danger" v-if="error && !success">
              <p>There was an error, unable to complete registration.</p>
            </div>
            <div class="alert alert-success" v-if="success">
              <p>Registration completed. You can now <router-link :to="{name:'login'}">sign in.</router-link></p>
            </div>

            <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">

              <!--div class="container col-md-12"-->

                <div class="input-container" v-bind:class="{ 'has-error': error && errors.name }">
                  <label for="name" class="control-label sr-only">Name</label>
                  <custom-input id="name" name="name" class="form-control input-field" 
                    v-model="name" placeholder="Name" autocomplete="" required autofocus>
                  </custom-input>
                  <span class="help-block" v-if="error && errors.name">{{ errors.name }}</span>
                </div>

                <div class="input-container" v-bind:class="{ 'has-error': error && errors.email }">
                  <label for="email" class="control-label sr-only">Email</label>
                  <custom-input id="email" name="email" class="form-control input-field" 
                    v-model="email" placeholder="Email" required>
                  </custom-input>
                  <span class="help-block" v-if="error && errors.email">{{ errors.email }}</span>
                </div>

                <div class="input-container" v-bind:class="{ 'has-error': error && errors.password }">
                  <label for="password" class="control-label sr-only"> Password</label>
                  <custom-input id="password" name="password" type="password" class="form-control input-field" 
                    v-model="password" placeholder="Password" required>
                  </custom-input>
                  <span class="help-block" v-if="error && errors.password">{{ errors.password }}</span>
                </div>

                <div class="input-container">
                  <label for="password-confirm" class="control-label sr-only">Confirm Password</label>
                  <custom-input id="password-confirm" name="password_confirmation" type="password" class="form-control input-field" 
                    v-model="password_c" placeholder="Confirm Password" required>
                  </custom-input>
                </div>

                <div class="button-container">
                  <router-link to="/login" class="text-center">Have an account? Login</router-link>
                  <button type="submit" class="btn btn-success pull-right"><span class="glyphicon glyphicon-user"></span> Register</button>
                </div>
              <!--/div-->
            </form>
          </div>
          <!--div class="panel-footer clearfix">
            <span v-if="registerError!=''" class="help-block">
              <strong> {{ registerError }} </strong>
            </span>
            <span v-else class="help-block">
              <strong>  </strong>
            </span>
          </div-->
        </div>
      </div>
    <!--/div-->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data(){
    return {
      name: '',
      email: '',
      password: '',
      password_c: '',
      error: false,
      errors: {},
      success: false
    };
  },
  computed: {
    /*
    ...mapState('authentication', [
      'registerName',
      'registerEmail',
      'registerPassword',
      'passwordConf',
      'registerError'
    ]),
    */
  },
  methods: {
    /*
    ...mapMutations('authentication', [
      'setRegisterName',
      'setRegisterEmail',
      'setRegisterPassword',
      'setPasswordConf',
      'setRegisterError'
    ]),
    
    ...mapActions('authentication', [
      'register'
    ]),
    */
    register() {
      var app = this
      app.error = false
      this.$auth.register({
        data: {
          name: app.name,
          email: app.email,
          password: app.password,
          password_confirmation: app.password_c
        }, 
        success: function () {
          app.success = true
          app.error = false
        },
        error: function (resp) {
          app.error = true
          app.errors = resp.response.data.errors
        },
        redirect: null
      });
    }
  },
  // mounted () {this.setRegisterError, ''},
  // mounted () {this.$store.commit('setRegisterError', '')},
};
</script>

<style scoped>

.button-container {
  width: 100%;
  margin-bottom: 10px;
}

.input-container {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}

.input-field {
  width: 100%;
  padding: 10px;
  outline: none;
}

.input-field:focus {
  border: 2px solid dodgerblue;
}

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
}
</style>
