import { createStore } from 'vuex'

export default createStore({
  // we want to keep track of user
  state: {
    user: {
      token: '',
      isAuthenticated: false,
    }
  },
  getters: {
  },
  mutations: {
    // we check the storage to chak wether the userr is log in or not
    initializeStore(state) {
      if (localStorage.getItem('token')){
        state.user.token = localStorage.getItem('token')
        state.user.isAuthenticated = true
      } else {
        state.user.token = ''
        state.user.isAuthenticated = false
      }
    },
    // some method to use for furthur
    setToken(state, token) {
      state.user.token = token
      state.user.isAuthenticated = true
    },
    removeToken(state) {
      state.user.token = ''
      state.user.isAuthenticated = false
    }
  },
  actions: {
  },
  modules: {
  }
})
