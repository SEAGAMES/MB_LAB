// src/store/index.js
import { createStore } from "vuex";

const store = createStore({
  mutations: {
    setUserData(state, payload) {
      state.userData = payload;
      clearInterval(state.temp_time);
      state.time = payload.current_time;
      state.temp_time = setInterval(() => {
        state.time = new Date(state.time).getTime() + 1000;
      }, 1000);
    },
    setUserPolicy(state, payload) {
      state.userPolicy = payload;
    },
    setShowname(state, payload) {
      state.showname = payload;
    },
    setPosition(state, payload) {
      state.position = payload;
    },
    setLanguage(state, payload) {
      state.language = payload;
    },
    setPermission(state, payload) {
      state.show_management = payload;
    },
  },
  actions: {
    addUserData(context, value) {
      context.commit("setUserData", value);
    },
    addUserPolicy(context, value) {
      context.commit("setUserPolicy", value);
    },
    swapName(context, value) {
      context.commit("setShowname", value);
    },
    swapPosition(context, value) {
      context.commit("setPosition", value);
    },
    addLanguage(context, value) {
      context.commit("setLanguage", value);
    },
    show_management(context, value) {
      context.commit("setPermission", value);
    },
  },
  getters: {
    userData(state) {
      return state.userData;
    },
    userPolicy(state) {
      return state.userPolicy;
    },
    showname(state) {
      return state.showname;
    },
    showPosition(state) {
      return state.position;
    },
    language(state) {
      return state.language;
    },
    showManagement(state) {
      return state.show_management;
    },
    server_time(state) {
      return state.time;
    },
  },
  modules: {},
});

export default store;
