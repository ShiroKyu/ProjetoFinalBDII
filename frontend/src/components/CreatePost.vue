<template>
  <router-view>
    <form class="create-post">
      <input type="text" placeholder="Titulo" />
      <textarea placeholder="Descreva aqui o seu post"></textarea>
      <label for="img-post">Imagem <input id="img-post" type="file" /></label>

      <button type="submit">Enviar</button>
    </form>

    <section class="post-section"></section>
  </router-view>
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
.main-div {
  display: block;
}

.main-div h1 {
  color: #ffffff;
  text-align: center;
}

.create-post {
  display: flex;
  flex-direction: column;
}

a {
  text-decoration: none !important;
}

.header {
  width: 100vw;
  height: 10vh;
}

.nav-menu {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  height: 100%;
  width: 98%;
  font-family: 'Quicksand', sans-serif;
  font-size: 1rem;
  color: #ffffff;
}

.nav-menu p {
  padding: 20px;
  cursor: pointer;
}

.url-link {
  transition: border-bottom 0.7s ease;
  transition: color 0.7s ease;

  color: #d8cdcd;

  border-bottom: 1px solid rgba(0, 0, 0, 0);
}

.url-link:hover {
  border-bottom: 1px solid rgba(224, 197, 197, 0.836);
  color: #c99c9cea;
}

@media (max-width: 750px) {
  .nav-menu {
    justify-content: center;
  }

  .nav-menu p {
    padding: 0 20px;
  }
}

@media (max-width: 500px) {
  .header {
    height: 40vh;
  }
  .nav-menu {
    flex-direction: column;
  }

  .nav-menu p {
    padding: 15px;
  }
}
</style>
