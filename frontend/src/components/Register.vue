<template>
  <router-view>
    <section class="login-cover"></section>

    <section class="login-field">
      <form class="login-form" method="POST" @submit.prevent="getRes">
        <h1>Registre-se</h1>

        <input type="email" placeholder="Email" class="login-user" v-model="email" />
        <input type="text" placeholder="Matrícula" class="login-user" v-model="matricula" />
        <input type="password" placeholder="Senha" class="login-pass" v-model="password" />
        <button type="submit" class="login-btn">Criar</button>
      </form>
    </section>
  </router-view>
</template>

<script>
import { useToast } from 'vue-toastification';
import api from '../services/api';

export default {
  name: 'Register',

  data() {
    return {
      res: [],
      email: '',
      password: '',
      matricula: '',
    };
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    getRes() {
      const vue = this;

      api
        .post('http://localhost:3333/auth/register', {
          email: vue.email,
          password: vue.password,
          matricula: vue.matricula,
        })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ path: '/' });
            this.toast.success('Usuário criado com sucesso!', {
              timeout: 4000,
            });
          }
        })
        .catch((e) => {
          this.toast.error(e.response.data.error, {
            timeout: 4000,
          });
        });
    },
  },

  created() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token && email) {
      api.post('/auth/checklogin', { email, token }).then((response) => {
        if (response.status === 200) this.$router.push({ path: '/home' });
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-cover {
  width: 50%;
  height: 100%;
  background-image: url('../../public/img/undraw_secure_login_pdn4.svg');
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center center;
}

.login-field {
  width: 50%;
  height: 100%;

  font-family: 'Quicksand', sans-serif;
  font-weight: 400;
}

.login-field,
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form {
  justify-content: center;

  width: 100%;
  height: 100%;
  margin-top: 20px;
}

.login-form h1 {
  margin-bottom: 2rem;

  color: #ffffff;

  font-family: 'Quicksand', sans-serif;
  font-weight: 400;

  font-size: 2.7rem;
}

.login-user,
.login-pass {
  border-bottom: 1px solid #ffffff;
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 10px;
  outline: none;

  background-color: #ffffff00;

  color: #ffffff;

  width: 50%;
  height: 7%;

  transition: border 0.5s ease;
}

.login-user:focus,
.login-pass:focus {
  border-bottom: 1px solid #6b6060;
}

.login-user {
  margin: 10px auto 0;
}

.login-pass {
  margin: 10px auto 10px;
}

.login-btn {
  padding: 5px 10px 5px;
  margin: 1rem;
  outline: none;

  border: 1px solid #ffffff;
  border-radius: 2px;
  cursor: pointer;

  width: 30%;
  height: 6%;

  background-color: #ffffff00;
  color: #ffffff;

  transition: background-color 0.6s ease-out;
}

.login-btn:hover {
  background-color: #ffffffd5;
  color: var(--default-purple-color);
  /* border: none; */
}

::-webkit-input-placeholder {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
}

:-moz-placeholder {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
}

::-moz-placeholder {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
}

:-ms-input-placeholder {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
}
</style>
