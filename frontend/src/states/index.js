import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      count: 1,
      token: '',
      email: '',
    };
  },

  mutations: {
    updateToken(state, payload) {
      state.token = payload.token;
    },

    updateEmail(state, payload) {
      state.email = payload.email;
    },
  },

  actions: {
    updateToken(state, payload) {
      state.commit('updateToken', payload);
    },

    updateEmail(state, payload) {
      state.commit('updateEmail', payload);
    },
  },
});
