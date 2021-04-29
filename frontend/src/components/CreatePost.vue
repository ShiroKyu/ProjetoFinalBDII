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
          <p><a class="url-link">Buscar estudante</a></p>

          <p><a class="url-link" @click="deslogar">Sair</a></p>
        </nav>
      </header>

      <h1>Criar um post</h1>

      <form class="create-post" method="POST" @submit.prevent="createPost">
        <input required class="post-title" type="text" placeholder="Titulo" v-model="titulo" />
        <textarea
          rows="4"
          cols="50"
          required
          class="post-desc"
          placeholder="Descreva aqui o seu post"
          v-model="descricao"
        ></textarea>

        <button class="post-btn" type="submit">Enviar</button>
      </form>

      <section class="post-section"></section>
    </div>
  </router-view>
</template>

<script>
import { useToast } from 'vue-toastification';
import api from '../services/api';

export default {
  name: 'CreatePost',

  data() {
    return {
      titulo: '',
      descricao: '',
      user_id: '',
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    deslogar() {
      api
        .get('/auth/logout')
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

    createPost() {
      const vue = this;
      const email = localStorage.getItem('email');

      api
        .post('/post', {
          titulo: vue.titulo,
          descricao: vue.descricao,
          email,
        })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ path: '/home' });
            this.toast.success('Post criado com sucesso!!', {
              timeout: 3000,
            });
          }
        })
        .catch((e) => {
          this.toast.error(e.response.data.error, {
            timeout: 3000,
          });
        });
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
};
</script>

<style scoped>
/* Header */
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

/* Form */
.main-div {
  width: 100%;
  height: 100%;

  font-family: 'Quicksand', sans-serif;
}

.main-div h1 {
  color: #ffffff;
  text-align: center;

  margin: 30px;
  font-size: 2rem;
}

.create-post {
  display: flex;
  flex-direction: column;

  margin: 4rem;
  padding: 30px;

  background-color: #1b141f6b;

  border-radius: 20px;
}

.post-title,
.post-desc,
.post-label,
.post-btn {
  margin: 10px 0;
  padding: 10px;
}

.post-title {
  outline: none;
}

.post-desc {
  outline: none;

  max-width: 100%;
}

.post-desc:focus {
  border: 2px solid rgb(109, 33, 116);
}

.post-label {
  outline: none;
  color: white;
}

.post-btn {
  margin: 10px auto;
  padding: 10px 30px;
  outline: none;

  border: none;

  transition: background-color 0.5s ease;
  cursor: pointer;
}

.post-btn:hover {
  background-color: rgb(159, 107, 165);
  color: white;
}
</style>
