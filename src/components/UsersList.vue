<template>
  <div class="users-list">
    <h1>Users List</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
        <button @click="showUserAlbums(user.id)">Show Albums</button>
        <button @click="showUserPosts(user.id)">Show Posts</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("Error fetching users", error);
        });
    },
    showUserAlbums(userId) {
      this.$router.push({
        name: "user-details",
        params: { id: userId, pageType: "albums" },
      });
    },
    showUserPosts(userId) {
      this.$router.push({
        name: "user-details",
        params: { id: userId, pageType: "posts" },
      });
    },
  },
};
</script>

<style lang="scss">
@import "./variables.scss";
@import "./UsersList.scss";
</style>
