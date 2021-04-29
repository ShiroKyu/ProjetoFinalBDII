<template>
  <router-view>
    <section class="main">
      <section class="left-section">
        <!-- <div class="back-img"></div> -->

        <router-link class="back-link" to="/home"><a>&#8592; Voltar</a></router-link>

        <div class="profile-img-container">
          <div class="profile-img"></div>
        </div>
        <div class="student-info">
          <h2>Dados do estudante</h2>
          <p><b>Nome</b>: {{ informacoes_perfil.nome }}</p>
          <p><b>E-mail</b>: {{ informacoes_perfil.email }}</p>
          <p><b>Matrícula</b>: {{ informacoes_perfil.matricula }}</p>
          <p><b>Situação</b>: {{ informacoes_perfil.situacao }}</p>
          <p><b>Curso</b>: {{ informacoes_perfil.nome_curso }}</p>
        </div>
        <div class="update-password">
          <img class="cadeado" width="30" height="30" src="../../public/img/lock.png" />
          <p>Alterar senha</p>
        </div>
      </section>

      <section class="right-section"></section>
    </section>
  </router-view>
</template>
<script>
import { useToast } from 'vue-toastification';
import api from '../services/api';

export default {
  name: 'Perfil',
  data() {
    return {
      informacoes_perfil: {},
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
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
    const email = localStorage.getItem('email');

    api
      .get(`/user/${email}`)
      .then((response) => {
        this.$data.informacoes_perfil = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>

<style scoped>
.main {
  display: flex;

  height: 100%;
  width: 100%;

  font-family: 'Quicksand', sans-serif;
  font-weight: 400;
}
.left-section,
.right-section {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.left-section {
  position: relative;
  color: #ffffff;
}

.back-img {
  background-image: url('/img/ifpb.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  filter: grayscale(100%) brightness(0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -999;
}

.back-link {
  align-self: flex-start;
  text-decoration: none;
  position: absolute;
  top: 30px;
  left: 25px;
  color: white;
  transition: all 1s ease;
}

.back-link:hover {
  text-decoration: underline;
}

.right-section {
  background-image: linear-gradient(to right, #5d26c1, #a17fe0);
}

.student-info {
  width: 100%;
  padding: 30px;
  text-align: center;
  box-shadow: 2px 2px 6px black;
  background-image: linear-gradient(to right, #800080, #ffc0cb);
  color: black;
}

.student-info h2 {
  margin-bottom: 2rem;
}

.student-info p {
  padding: 8px;
}

.profile-img-container {
  width: 150px;
  height: 150px;
}

.profile-img {
  background-image: url('../../public/img/undraw_female_avatar_w3jk.svg');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;

  box-shadow: 2px 2px 6px black;
  border-radius: 50%;
}

.update-password {
  background-image: linear-gradient(to right, #bc4e9c, #f80759);
  width: 165px;
  height: 50px;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.7s ease;
  color: #000000;
  display: flex;
  flex-direction: row;
}
.cadeado {
  margin-right: 12px;
}
.update-password:hover {
  background-color: var(--purple-color);
}

.update-password p {
  font-size: 0.8rem;
}
</style>
