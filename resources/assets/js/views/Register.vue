<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="panel panel-default">
          <div class="panel-heading">Register</div>
          <div class="panel-body">
            <form class="form-horizontal">

              <div class="form-group">
                <label for="name" class="col-md-4 control-label">Name</label>
                <div class="col-md-6">
                  <custom-input id="name" name="name" class="form-control" v-model="registerName"
                    @input="setRegisterName" placeholder="John Doe" autocomplete="" required autofocus>
                  </custom-input>
                </div>
              </div>

              <div class="form-group">
                <label for="email" class="col-md-4 control-label">E-Mail</label>
                <div class="col-md-6">
                  <custom-input id="email" name="email" class="form-control" v-model="registerEmail" 
                    @input="setRegisterEmail" placeholder="new.user@example.com" required>
                  </custom-input>
                </div>
              </div>

              <div class="form-group">
                <label for="password" class="col-md-4 control-label">Password</label>
                <div class="col-md-6">
                  <custom-input id="password" name="password" type="password" class="form-control" v-model="registerPassword" 
                    @input="setRegisterPassword" placeholder="Password" required>
                  </custom-input>
                </div>
              </div>

              <div class="form-group">
                <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>
                <div class="col-md-6">
                  <custom-input id="password-confirm" name="password_confirmation" type="password" class="form-control" 
                    v-model="passwordConf" @input="setPasswordConf" placeholder="PasswordConf" required>
                  </custom-input>
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-6 col-md-offset-4">
                  <button type="submit" class="btn btn-primary" @click="register">
                    <span class="glyphicon glyphicon-user"></span> Register
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="panel-footer clearfix">
            <span v-if="registerError!=''" class="help-block">
              <strong> {{ registerError }} </strong>
            </span>
            <span v-else class="help-block">
              <strong>  </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('authentication', [
      'registerName',
      'registerEmail',
      'registerPassword',
      'passwordConf',
      'registerError'
    ]),
  },
  methods: {
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
  },
  mounted () {this.setRegisterError, ''},
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
}
</style>
