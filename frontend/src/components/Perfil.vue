<template>
  <router-view>
    <section class="main">
      <section class="left-section">
        <router-link class="back-link" to="/home"><a>&#8592; Voltar</a></router-link>

        <div class="profile-img-container">
          <img @click="mostrar" v-bind:src="profilePicUrl" alt="Profile pic" class="profile-img" />
        </div>

        <div class="student-info">
          <h2>Dados do estudante</h2>
          <p>
            <b>Nome</b>: <span>{{ informacoes_perfil.nome }}</span>
          </p>
          <p>
            <b>E-mail</b>: <span>{{ informacoes_perfil.email }}</span>
          </p>
          <p>
            <b>Matrícula</b>: <span>{{ informacoes_perfil.matricula }}</span>
          </p>
          <p>
            <b>Situação</b>: <span>{{ informacoes_perfil.situacao }}</span>
          </p>
          <p>
            <b>Curso</b>: <span>{{ informacoes_perfil.nome_curso }}</span>
          </p>
        </div>

        <div class="update-section">
          <div class="update-password">
            <img class="cadeado" width="30" height="30" src="../../public/img/lock.png" />
            <p>Alterar senha</p>
          </div>

          <form class="update-profilepic" @submit.prevent="updateProfilePic">
            <img class="cadeado" width="30" height="30" src="../../public/img/camera-retro.png" />
            <input id="upload-img" name="foto" type="file" placeholder="Atualizar foto de perfil" />
            <button id="upload-img-enviar" type="submit">Enviar</button>
          </form>
        </div>
      </section>

      <section class="right-section">
        <h2>Seus posts</h2>

        <section v-if="hasPosts" class="post-section">
          <div class="post-block" :key="index" v-for="(post, index) in informacoes_perfil.posts">
            <h3 class="post-title">{{ post.titulo }}</h3>
            <hr />
            <p class="post-desc">
              {{ post.descricao }}
            </p>
          </div>
        </section>

        <section v-else class="post-section">
          <h2>Nada aqui...</h2>
        </section>
      </section>
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
      hasPosts: false,
      profilePicUrl: '',
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    updateProfilePic() {
      const email = localStorage.getItem('email');

      const formData = new FormData();
      const foto = document.querySelector('#upload-img');

      formData.append('foto', foto.files[0]);
      formData.append('email', email);

      api
        .post('/foto', formData, {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          },
        })
        .then(() => {
          this.fetchFoto();
        });
    },

    fetchFoto() {
      const email = localStorage.getItem('email');

      api
        .get(`/user/${email}`)
        .then((response) => {
          if (!response.data.Foto) {
            const profImg = document.querySelector('.profile-img');
            profImg.src = 'img/undraw_female_avatar_w3jk.svg';
          } else this.$data.profilePicUrl = `http://${response.data.Foto.url}`;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    mostrar(e) {
      console.log(e.target.src);
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
    const email = localStorage.getItem('email');

    api
      .get(`/user/${email}`)
      .then((response) => {
        this.$data.informacoes_perfil = response.data;
        if (this.$data.informacoes_perfil.posts.length > 0) {
          this.hasPosts = true;
        }
      })
      .catch((e) => {
        console.log(e);
      });

    this.fetchFoto();
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
.left-section {
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

.right-section {
  width: 50%;
  height: 100%;
}

.right-section h2 {
  text-align: center;
  margin-top: 3rem;

  color: white;
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
  background-image: linear-gradient(to right, #59c173, #a17fe0, #5d26c1);
}
.student-info {
  width: 100%;
  padding: 30px;
  text-align: center;
  box-shadow: 2px 2px 6px black;
  background-image: linear-gradient(to right, #800080, #ffc0cb);
  color: white;
}

.student-info h2 {
  margin-bottom: 2rem;
  color: white;
}

.student-info p {
  padding: 8px;
}

.student-info span {
  color: black;
}

.profile-img-container {
  width: 150px;
  height: 150px;
}

.profile-img {
  /* background-image: url('../../public/img/undraw_female_avatar_w3jk.svg'); */
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;

  border-radius: 50%;

  transition: all 0.5s ease;
}

.profile-img:hover {
  transform: translateX(20px);
  box-shadow: 2px 2px 6px black;
}

.update-section {
  display: flex;
  justify-content: space-evenly;

  width: 100%;

  margin: 20px auto;
}
.update-profilepic,
.update-password {
  background-image: linear-gradient(to right, #59c173, #a17fe0, #5d26c1);
  text-align: center;

  width: 200px;
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

  transition: transform 0.5s ease;
}

.update-profilepic {
  width: 240px;
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

.update-profilepic:hover,
.update-password:hover {
  transform: translateY(-5px);
}
#upload-img {
  background: none;
  cursor: pointer;
}
#upload-img-enviar {
  background-color: #ffc0cb;
  border-radius: 5px;
  border: none;
  padding: 3px;
  margin: 1px;
  cursor: pointer;
}
.post-section {
  margin: 30px 0;

  width: 100%;
  height: 80%;
  font-family: 'Quicksand', sans-serif;

  overflow-y: auto;
}

.post-block {
  width: 90%;
  max-height: 200px;
  background-color: #1b141f6b;
  margin: 10px auto;
  padding: 10px;

  border-radius: 5px;
  overflow-y: auto;
}

.post-title {
  color: white;
}

.post-desc {
  padding: 5px 0;

  overflow-x: auto;
}
</style>
