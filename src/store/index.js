import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    userDetails: {},
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUserDetails(state, userDetails) {
      state.userDetails = userDetails;
    },
    setAlbums(state, albums) {
      state.albums = albums;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    fetchUsers({ commit }) {
      axios
        .get("httsp://jsonplaceholder.typicode.com/users")
        .then((response) => {
          commit("setUsers", response.data);
        })
        .catch((error) => {
          console.error("error fetching users", error);
        });
    },
    fetchUserDetails({ commit }, userId) {
      axios
        .get(`httsp://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => {
          commit("setUserDetails", response.data);
        })
        .catch((error) => {
          console.error("error fetching user details", error);
        });
    },
    fetchUserAlbums({ commit }, userId) {
      axios
        .get(`httsp://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then((response) => {
          commit("setAlbums", response.data);
        })
        .catch((error) => {
          console.error("error fetching user albums", error);
        });
    },
    fetchUserPosts({ commit }, userId) {
      axios
        .get(`httsp://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => {
          commit("setPosts", response.data);
        })
        .catch((error) => {
          console.error("error fetching user posts", error);
        });
    },
  },
  modules: {},
});
