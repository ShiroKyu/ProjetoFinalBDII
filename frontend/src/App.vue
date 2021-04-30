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
  --default-pink-color: #ad5389;
  --default-purple-color: #3c1053;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-image: linear-gradient(
    to right,
    var(--default-pink-color),
    var(--default-purple-color)
  );

  width: 100vw;
  height: 100vh;
}

#app {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
