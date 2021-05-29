import api from "../api";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      return api.auth.login(user).then(
        (user) => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      api.auth.logout();
      commit("logout");
    },
    register({ commit }, user) {
      return api.auth.register(user).then(
        (response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("registerFailure");
          return Promise.reject(error);
        }
      );
    },
    updateBalance({ commit },user){
      return api.payments.getBalance(user).then(
        (response) => {
          commit("updateBalance",response.amount)
          return Promise.resolve();
        },
        (error) => {
          return Promise.reject(error);
        }
      )
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    updateBalance(state, balance) {
      state.user.balance = balance;
    }
  },
  getters: {
    isAdmin: (state) => {
      return state.user.roles.includes("ADMINISTRATOR");
    },
    getUserID: (state) => {
      return state.user.id;
    },
    getUsername: (state) => {
      return state.user.username;
    },
    getBalance: (state) => {
      return state.user.balance;
    },
  },
};