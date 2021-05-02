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
        <label for="course-filter">Curso: </label>

        <select name="course-filter" id="course-filter" v-model="cursoAtual">
          <option class="course-option" :key="index" v-for="(curso, index) in cursos">
            {{ curso.nome }}
          </option>
        </select>

        <button class="filter-btn" type="submit">Filtrar</button>
      </form>

      <!-- Filtro de situação -->
      <form class="filter-section situacao" method="GET" @submit.prevent="filterSituacao">
        <label for="situacao-filter">Situação: </label>

        <select name="situacao-filter" id="situacao-filter" v-model="situacaoAtual">
          <option class="situacao-option">Matriculado</option>
          <option class="situacao-option">Transferido Externo</option>
          <option class="situacao-option">Concluído</option>
        </select>

        <button class="filter-btn" type="submit">Filtrar</button>
      </form>

      <section class="user-section">
        <div class="user-block" :key="index" v-for="(student, index) in students">
          <h3 class="user-nome">{{ student.nome }}</h3>
          <hr />
          <p class="user-email">Matrícula: {{ student.matricula }}</p>
          <p class="user-email">Curso: {{ student.Curso.nome }}</p>
          <p class="user-matricula">Cota: {{ student.cota }}</p>
          <p class="user-matricula">Situação: {{ student.situacao }}</p>
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
      cursoAtual: '',
      situacaoAtual: '',
      students: [],
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

    filterSituacao() {
      const vue = this;
      api
        .get('/student/')
        .then((response) => {
          vue.students = response.data;

          vue.students = vue.students.filter((student) => student.situacao === vue.situacaoAtual);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    filterCourse() {
      const vue = this;
      api
        .get('/student/')
        .then((response) => {
          vue.students = response.data;
          vue.students = vue.students.filter((student) => student.Curso.nome === vue.cursoAtual);
        })
        .catch((e) => {
          console.log(e);
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

.user-section {
  display: flex;
  flex-wrap: wrap;

  justify-content: center;

  width: 100%;
  height: 100%;

  font-family: 'Quicksand', sans-serif;
}

.user-section-void {
  font-family: 'Quicksand', sans-serif;
  text-align: center;
}

.user-block {
  padding: 20px;
  margin: 10px;
  /*background-color: #ff00005c;*/
  background-color: #1b141f6b;
  width: 300px;
  max-height: 300px;
  border-radius: 10px;

  transition: transform 0.7s ease;
}

.user-block:hover {
  transform: scale(1.05);
}

.user-nome,
.user-email,
.user-matricula {
  margin: 10px auto;
}

.user-nome {
  color: #ffffff;
}

.user-email,
.user-matricula {
  color: #ffffff;

  margin: 10px auto;
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
  background-color: #5d26c1;
  color: #fff;
  font-size: 15px;
  border-radius: 5px;
  border-style: none;
  cursor: pointer;
}

.situacao-option {
  padding: 5px;
}

.filter-btn,
.reset-btn {
  color: white;
  padding: 5px;
  background-color: #7303c0;
  border-radius: 5px;
  border: 2px solid #333333;
  cursor: pointer;
}
</style>
