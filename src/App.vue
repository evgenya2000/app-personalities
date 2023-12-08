<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
#app {
  font-family: "Roboto", sans-serif;
  text-align: center;
}

%style-ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
