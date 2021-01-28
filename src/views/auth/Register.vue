<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md="8" class="mx-auto my-auto">
      <b-card class="auth-card d-flex align-items-center" no-body>
        <div class="position-relative p-4 text-black">
          <h3>Welcome to WashIt</h3>
          <p class="mb-0"> Please use this form to register. <br/>If you are a member, please
            <router-link tag="a" to="/auth/login">login</router-link>
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
          <h6 class="mb-4">{{ $t('user.register') }}</h6>
          <b-form @submit.prevent="formSubmit">
            <label class="form-group has-float-label mb-4">
              <input type="text" class="form-control" v-model="formData.name">
              <span>{{ $t('user.fullname') }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input type="text" class="form-control" v-model="formData.username">
              <span>{{ $t('user.username') }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input type="email" class="form-control" v-model="formData.email">
              <span>{{ $t('user.email') }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input type="password" class="form-control" v-model="formData.password">
              <span>{{ $t('user.password') }}</span>
            </label>
            <div class="form-group">
              <input type="checkbox" value="admin" v-model="formData.isAdmin" id="asOwner" class="op-0">
              <label for="asOwner">as Owner?</label>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <router-link tag="a" to="/auth/login" class="text-dark">
                {{ $t('user.login-title') }}
              </router-link>
              <b-button type="submit" variant="primary" size="lg" class="btn-shadow">{{ $t('user.register-button') }}
              </b-button>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        username: '',
        isAdmin: ''
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    formSubmit () {
      const { name, username, email, password } = this.formData
      axios
        .post('/user/register', { name, username, email, password, isAdmin: this.formData.isAdmin === '' ? 0 : 1 })
        .then(({ data, status }) => {
          if (status === 200) {
            this.$notify('success', 'Success', 'Your registrations has been successfully completed', { duration: 5000 })
            this.$router.push('/auth/login')
            this.formData = {
              name: '',
              email: '',
              password: '',
              username: '',
              isAdmin: ''
            }
          }
        })
        .catch((error) => {
          this.$notify('error', 'Something bad happened', error, { duration: 5000 })
        })
    }
  }
}
</script>
