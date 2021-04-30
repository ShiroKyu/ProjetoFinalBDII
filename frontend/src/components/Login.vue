<template>
  <router-view>
    <section class="login-cover"></section>

    <section class="login-field">
      <form class="login-form" method="POST" @submit.prevent="getRes">
        <h1>Login</h1>

        <input type="email" placeholder="E-mail" class="login-user" v-model="email" />
        <input type="password" placeholder="Senha" class="login-pass" v-model="password" />

        <button type="submit" class="login-btn">Entrar</button>

        <router-link to="/register"><a class="reg-link">Criar uma conta -></a></router-link>
      </form>
    </section>
  </router-view>
</template>

<script>
import { useToast } from 'vue-toastification';
import api from '../services/api';

export default {
  name: 'Login',

  data() {
    return {
      res: [],
      email: '',
      password: '',
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
        .post('/auth/login', {
          email: vue.email,
          password: vue.password,
        })
        .then((response) => {
          if (response.status === 200) {
            const { token } = response.data;

            localStorage.setItem('email', vue.email);
            localStorage.setItem('token', token);

            this.$router.push({ path: '/home' });

            this.toast.success('Logado!', {
              timeout: 4000,
            });
          }
        })
        .catch((e) => {
          console.log(e);
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
      api
        .post('/auth/checklogin', { email, token })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ path: '/home' });
          }
        })
        .catch((e) => {
          console.log('erro', e);
        });
    }
  },
};
</script>

<style scoped>
.login-cover {
  width: 50%;
  height: 100%;
  background-image: url('../../public/img/undraw_authentication_fsn5.svg');
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
  margin: 20px auto 0;
}

.login-pass {
  margin: 10px auto 10px;
}

.reg-link {
  text-decoration: none;
  color: #ffffff;
  transition: all 2s ease;
}

.reg-link:hover {
  text-decoration: underline;
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
