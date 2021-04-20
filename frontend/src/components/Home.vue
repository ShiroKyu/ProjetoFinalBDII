<template>
  <h1>Home route</h1>
  <p v-if="res.length === 0">Carregando.....</p>
  <ul v-else>
    <li :key="index" v-for="(people, index) in res">
      <p>{{ people.name }}</p>
      <p>{{ people.email }}</p>
      <hr />
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',

  data() {
    return {
      res: [],
    };
  },

  methods: {
    getRes() {
      const vue = this;

      axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        vue.res = response.data;
        console.log(vue.res);
      });
    },
  },

  mounted() {
    this.getRes();
  },

  // watch: {
  //   response(newValue, oldValue) {},
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style: none;
}
</style>
