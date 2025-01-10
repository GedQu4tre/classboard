import { createStore } from 'vuex'
import router from '../router'
import axios from 'axios';

const store = createStore({
  state() {
    return {
      token: localStorage.getItem('token') || '',
      user: JSON.parse(localStorage.getItem('user')) || null,
      isAuthenticated: !!localStorage.getItem('token'),
      baseURL: 'http://localhost:3000',
      currentView: 'HomeAdmin',
    }
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    LOGOUT(state) {
      state.token = '';
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  actions: {
    async login({ commit, state }, credentials) {
      try {
        const response = await axios.post(`${state.baseURL}/personnel/login`, credentials);

        const { token, user } = response.data;

        commit('SET_TOKEN', token);
        commit('SET_USER', user);

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return response.data;
      } catch (error) {
        if (error.response) {
          throw new Error(error.response.data.error || "Une erreur est survenue.");
        }
        throw new Error('Échec de la connexion. Veuillez réessayer.');
      }
    },
    logout({ commit }) {
      commit('LOGOUT');
      delete axios.defaults.headers.common['Authorization'];
    },
    initialize({ commit }) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        commit('SET_TOKEN', token);
        commit('SET_USER', JSON.parse(user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
    baseURL: (state) => state.baseURL
  },
});


export default store;