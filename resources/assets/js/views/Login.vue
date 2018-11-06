<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="panel panel-default">
          <div class="panel-heading">Register</div>
          <div class="panel-body">
            <form class="form-horizontal">

              <div class="form-group">
                <label for="email" class="col-md-4 control-label">Email</label>
                <div class="col-md-6">
                  <custom-input id="email" name="email" type="email" class="form-control" 
                    v-model="loginEmail" @input="setLoginEmail" placeholder="new.user@example.com" 
                    autocomplete="username" required>
                  </custom-input>
                </div>
              </div>

              <div class="form-group">
                <label for="password" class="col-md-4 control-label">Password</label>
                <div class="col-md-6">
                  <custom-input id="password" name="password" type="password" class="form-control" 
                    v-model="loginPassword" @input="setLoginPassword" placeholder="Password" 
                    autocomplete="new-password" required>
                  </custom-input>
                </div>
              </div>

              <span class="help-block" v-if="loginError">
                <strong>{{ loginError }}</strong>
              </span>

              <div class="form-group">
                <div class="col-md-6 col-md-offset-4">
                  <button type="submit" class="btn btn-primary" @click="login">
                    <span class="glyphicon glyphicon-log-in"></span> Login
                  </button>
                </div>
              </div>

            </form>
          </div>
          <div class="panel-footer clearfix">
            <span v-if="loginError!=''" class="help-block">
              <strong> {{ loginError }} </strong>
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
      'loginEmail',
      'loginPassword',
      'loginError',
    ]),
  },
  methods: {
    ...mapMutations('authentication', [
      'setLoginEmail',
      'setLoginPassword',
    ]),
    ...mapActions('authentication', [
      'login',
    ]),
  },
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
