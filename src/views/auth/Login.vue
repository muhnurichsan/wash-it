<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="8" class="mx-auto my-auto">
      <b-card class="auth-card d-flex align-items-center" no-body>
        <div class="position-relative text-black p-4">
          <h3>Welcome to WashIt</h3>
          <p class="mb-0">Please use your credentials to login.<br>If you are not a member, please
            <router-link tag="a" to="/auth/register">register</router-link>
            .
          </p>
          <router-link to="/">
            <b-button type="button" variant="light" class="mt-3">
              Back to home
            </b-button>
          </router-link>
        </div>
        <div class="p-4 w-60">
          <router-link tag="a" to="/" class="d-flex">
            <img
                src="@/assets/landing/img/logo2.png"
                alt=""
                class="mx-auto"
                height="100"
                width="100"
            />
          </router-link>
          <h6 class="mb-4">{{ $t('user.login-title') }}</h6>
          <b-form @submit.prevent="formSubmit">
            <label class="form-group has-float-label mb-4">
              <input type="text" class="form-control" v-model="username">
              <span>{{ $t('user.username') }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input type="password" class="form-control" v-model="password">
              <span>{{ $t('user.password') }}</span>
            </label>
            <div class="d-flex justify-content-between align-items-center">
              <router-link tag="a" to="/auth/register" class="text-dark">{{ $t('user.register') }}</router-link>
              <b-button type="submit" variant="primary" size="lg" class="btn-shadow" :disabled="processing">
                {{ $t('user.login-button') }}
              </b-button>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'processing', 'loginError'])
  },
  methods: {
    ...mapActions(['login']),
    formSubmit () {
      this.login({ username: this.username, password: this.password })
    }
  },
  watch: {
    currentUser (val) {
      if (val && val.id) {
        if (!val.isAdmin) {
          setTimeout(() => {
            this.$router.push('/')
          }, 500)
        } else {
          setTimeout(() => {
            this.$router.push('/app/admin/dashboard')
          }, 500)
        }
      }
    },
    loginError (val) {
      if (val != null) {
        this.$notify('error', 'Login Error', val, { duration: 3000, permanent: false })
      }
    }
  }
}
</script>
<style>
.w-60 {
  width: 60% !important;
}
.w-40 {
  width: 40% !important;
}
</style>
