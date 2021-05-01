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

      <h1>Estudantes</h1>

      <!-- Filtro de cursos -->
      <form class="filter-section" method="GET" @submit.prevent="filterCourse">
        <label for="course-filter">Filtrar: </label>

        <select name="course-filter" id="course-filter" v-model="email">
          <option class="course-option" :key="index" v-for="(curso, index) in cursos">
            {{ curso.nome }}
          </option>
        </select>

        <button class="filter-btn" type="submit">Filtrar</button>
      </form>

      <!-- Filtro de situação -->
      <form class="filter-section situacao" method="GET" @submit.prevent="filterSituacao">
        <label for="situacao-filter">Filtrar: </label>

        <select name="situacao-filter" id="situacao-filter" v-model="email">
          <option class="situacao-option">Matrículado</option>
          <option class="situacao-option">Transferido externo</option>
          <option class="situacao-option">Concluído</option>
        </select>

        <button class="filter-btn" type="submit">Filtrar</button>
      </form>

      <section v-if="hasPosts" class="user-section">
        <div class="user-block" :key="index" v-for="(user, index) in users">
          <h3 class="user-title">{{ user.titulo }}</h3>
          <hr />
          <p class="user-desc">
            {{ user.descricao }}
          </p>
          <p class="user-author">
            Autor: <span>{{ user.email }}</span>
          </p>
        </div>
      </section>

      <section v-if="hasPosts && email" class="post-section">
        <div class="post-block" :key="index" v-for="(post, index) in posts">
          <h3 class="post-title">{{ post.titulo }}</h3>
          <hr />
          <p class="post-desc">
            {{ post.descricao }}
          </p>
          <p class="post-author">
            Autor: <span>{{ post.email }}</span>
          </p>
          <p class="post-date">
            Data e hora da publicação:<br />
            <span
              >{{ new Date(post.data).toLocaleDateString() }}
              {{ new Date(post.data).toLocaleTimeString() }}</span
            >
          </p>
        </div>
      </section>
    </div>
  </router-view>
</template>

<script>
import { useToast } from 'vue-toastification';
import api from '../services/api';

export default {
  name: 'Search',
  data() {
    return {
      cursos: [],
      users: [],

      email: '',
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    getCursos() {
      const vue = this;

      api.get('/curso').then((response) => {
        if (response.status === 200) {
          vue.cursos = response.data;
        }
      });
    },

    getUsers() {
      const vue = this;
      api
        .get('/user/')
        .then((response) => {
          vue.users = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    filterSituacao() {},
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
    this.getCursos();
  },
};
</script>

<style scoped>
/* Header */
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
/* ////////// */

.main-div {
  display: block;

  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Quicksand', sans-serif;
}

.main-div h1 {
  color: #ffffff;
  text-align: center;

  margin: 30px;
}

.alter-post:hover,
.alter-filter:hover {
  text-decoration: underline;
}

.post-section {
  display: flex;
  flex-wrap: wrap;

  justify-content: center;

  width: 100%;
  height: 100%;

  font-family: 'Quicksand', sans-serif;
}

.post-section-void {
  font-family: 'Quicksand', sans-serif;
  text-align: center;
}

.post-block {
  padding: 20px;
  margin: 10px;
  /*background-color: #ff00005c;*/
  background-color: #1b141f6b;
  width: 300px;
  max-height: 400px;
  border-radius: 10px;

  transition: transform 0.7s ease;
}

.post-block:hover {
  transform: scale(1.05);
}

.post-title,
.post-desc,
.post-time,
.post-date {
  margin: 10px auto;
}

.post-title {
  color: #ffffff;
}

.post-desc {
  background-color: white;
  border-radius: 5px;
  padding: 10px;

  max-height: 200px;

  overflow-y: auto;
}

span {
  color: #ffffff;
}

a {
  text-decoration: none !important;
}

.filter-section {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 50px;
  color: white;
}
.situacao {
  margin-top: -30px;
}

#course-filter,
#situacao-filter {
  padding: 5px;
  outline: none;
  margin: 0 10px;
}

.post-option {
  padding: 5px;
}

.filter-btn,
.reset-btn {
  padding: 5px;
}
</style>
