import axios from 'axios'
import VueJwtDecode from 'vue-jwt-decode'

export default {
  state: {
    currentUser: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null,
    loginError: null,
    processing: false
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError
  },
  mutations: {
    setUser (state, payload) {
      state.currentUser = payload
      state.processing = false
      state.loginError = null
    },
    setLogout (state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
    },
    setProcessing (state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError (state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    clearError (state) {
      state.loginError = null
    }
  },
  actions: {
    login ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      axios
        .post('/user/login', { username: payload.username, password: payload.password })
        .then(({ data }) => {
          const { AuthData: user } = VueJwtDecode.decode(data.AccessToken)

          const item = { ...user }
          localStorage.setItem('user', JSON.stringify(item))
          commit('setUser', { ...user })
        })
        .catch((error) => {
          localStorage.removeItem('user')
          commit('setError', error.message)
        })
    },
    signOut ({ commit }) {
      localStorage.removeItem('user')
      commit('setLogout')
    }
  }
}
