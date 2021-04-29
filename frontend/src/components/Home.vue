<template>
  <router-view>
    <div class="main-div">
      <header class="header">
        <nav class="nav-menu">
          <router-link to="/home"
            ><p><a class="url-link">Home</a></p></router-link
          >
          <router-link to="/createpost"
            ><p><a class="url-link">Criar post</a></p></router-link
          >
          <router-link to="/perfil"
            ><p><a class="url-link">Perfil</a></p></router-link
          >
          <router-link to="/search"
            ><p><a class="url-link">Buscar estudante</a></p></router-link
          >
          <p><a class="url-link" @click="deslogar">Sair</a></p>
        </nav>
      </header>

      <h1>Posts</h1>

      {{ posts }}

      <section class="post-section"></section>
    </div>
  </router-view>
</template>

<script>
import { useToast } from 'vue-toastification';
import api from '../services/api';

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
    };
  },

  // computed: {
  //   counter() {
  //     return this.$store.state.count;
  //   },
  //   token() {
  //     return this.$store.state.token;
  //   },
  // },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    deslogar() {
      localStorage.removeItem('email');
      localStorage.removeItem('token');

      this.$router.push({ path: '/' });
    },
  },

  created() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token && !email) {
      this.$router.push({ path: '/' });
      this.toast.error('Não autorizado!', {
        timeout: 4000,
      });
    }

    if (token && email) {
      api.post('/auth/checklogin', { email, token }).catch(() => {
        this.$router.push({ path: '/home' });
        this.toast.error('Não autorizado!', {
          timeout: 4000,
        });
      });
    }
  },

  mounted() {
    api.get('/post').then((response) => {
      if (response.status === 200) {
        this.$data.posts = response.data;
      }
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

.post-section {
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
