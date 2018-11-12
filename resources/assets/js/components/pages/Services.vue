<template>

<div class="container">
  <div class="row">
    <h2>Services</h2>
    <div class="col-md-8 col-md-offset-2">
      <div class="panel panel-default">
        <div class="panel-heading">Services</div>
        <div class="panel-body">
          <div v-if="isLoggedIn" class="alert alert-success">
            {{ session('status') }}
          </div>
            This is the <strong>Services</strong> page
        </div>
		<div class="panel-footer clear-fix">
			Services Footer
		</div>
      </div>
    </div>
  </div>
</div>

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
