import { createStore } from 'vuex'
import router from '../router'

const store = createStore({
  state() {
    return {
      // user: null,
      user: null,
        // baseURL: 'http://localhost/back-onem/post-onem.php?onem',
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    unsetUser(state, kindAccount) {
      if (kindAccount === 'staff') {
        router.push({path: '/loginStaff'})
      } else {
        router.push({path: '/login'})
      }
      state.user = null;
    }
  },
  actions: {
    loginUser({ commit }, user) {
      commit('setUser', user)

      localStorage.setItem('user', JSON.stringify(user))
    },

  },
  getters: {
    getUser(state) {
      return state.user
    }
  }
})

export default store