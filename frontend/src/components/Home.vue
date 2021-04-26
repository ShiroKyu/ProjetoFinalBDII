<template>
  <h1>Rota principal</h1>

  <button type="button" @click="deslogar">Deslogar</button>
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
    deslogar() {
      axios
        .get('http://localhost:3333/auth/logout')
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ path: '/' });
          }
        })
        .catch((e) => {
          console.log(e);
          console.log('falhou');
        });
    },
  },

  created() {
    axios.get('http://localhost:3333/auth/checklogin').catch(() => {
      this.$router.push({ path: '/' });
    });
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
