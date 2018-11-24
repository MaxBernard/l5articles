<template>
  <div class="container-fluid">
    <!--div class="row"-->
      <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">
          <div class="panel-heading">Login</div>
          <div class="panel-body">

            <div class="alert alert-danger" v-if="error">
              <p>Error: Unable to sign in with those credentials.</p>
            </div>

            <form autocomplete="off" @submit.prevent="login" method="post">
              <div class="imgcontainer">
                <img style="width:20%" src="/img/avatar_02.png" alt="Avatar" class="avatar">
              </div>

              <div class="container col-md-12">

                <div class="form-group">
                  <!--label for="email" class="col-md-2 control-label">Email</label-->
                  <!--i class="fa fa-envelope icon"></i-->
                  <!--div class="col-md-10"-->
                  <label for="email"><span class="glyphicon glyphicon-user"></span> Username</label>
                    <custom-input type="email" id="email" name="email" class="form-control input-field" 
                      v-model="email" placeholder="Email" autocomplete="username" required>
                    </custom-input>
                  <!--/div-->
                </div>

                <div class="form-group">
                  <!--label for="password" class="col-md-2 control-label">Pass</label-->
                  <!--i class="fa fa-key icon"></i-->
                  <!--div class="col-md-10"-->
                  <label for="password"><span class="glyphicon glyphicon-eye-open"></span> Password</label>
                    <custom-input id="password" name="password" type="password" class="form-control input-field" 
                      v-model="password" placeholder="Password" required>
                    </custom-input>
                  <!--/div-->
                </div>

                <div class="button-container">
                  <button type="button" class="btn btn-warning">Cancel</button>
                  <router-link to="/register" class="text-center">No account? Register</router-link>
                  <button type="submit" class="btn btn-success pull-right"><span class="glyphicon glyphicon-user"></span> Login</button>
                </div>

              </div>

              <!--div class="flex-sb-m w-full p-b-30">
                <div class="contact100-form-checkbox">
                  <input class="input-checkbox100" type="checkbox" checked="checked" id="ckb1" name="remember"> Remember me
                  <label class="label-checkbox100" for="ckb1">
                </div>

                <div>
                  <a href="#" class="txt1">
                    Forgot Password?
                  </a>
                </div>
              </div-->
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
    <!--/div-->
  </div>
</template>

<script>
//import { mapState, mapMutations, mapActions } from 'vuex';

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
        fetchUser: true,
      })
    },
  },
  // mounted () {this.setLoginError, ''},
}
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

.icon {
  padding: 10px;
  background: grey;
  color: white;
  min-width: 50px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  outline: none;
}

.input-field:focus {
  border: 2px solid dodgerblue;
}

.imgcontainer {
  text-align: center;
  margin: 12px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}

span.psw {
  float: right;
  padding-top: 16px;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  /*box-sizing: border-box;*/
}

buttons {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  /*width: 100%;*/
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.panel-heading {
  height: 42px;
  font-size: 1.2em;
  color: white;
  background-color: grey;
}

.panel-body {
  padding: 2px;
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
