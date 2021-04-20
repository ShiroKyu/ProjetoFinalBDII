<template>
  <!-- <div id="nav">
    <router-link to="/" msg="Paulo">Home</router-link> |
    <router-link to="/login">About</router-link>
  </div>
  <router-view /> -->

  <router-view />
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
:root {
  --purple-color: #6c63ff;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  width: 100vw;
  height: 100vh;
}
</style>
