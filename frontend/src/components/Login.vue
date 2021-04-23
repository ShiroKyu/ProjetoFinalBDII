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
import axios from 'axios';

export default {
  name: 'Login',

  data() {
    return {
      res: [],
      email: '',
      password: '',
    };
  },

  methods: {
    getRes() {
      const vue = this;

      axios
        .post('http://localhost:3333/auth/login', {
          email: vue.email,
          password: vue.password,
        })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ path: '/home' });
          }
        })
        .catch(() => {
          this.$router.push({ path: '/perfil' });
        });
    },
  },

  beforeMount() {
    localStorage.removeItem('teste');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-cover {
  width: 50%;
  height: 100%;
  background-color: #6c63ff;
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

  font-family: 'Quicksand', sans-serif;
  font-weight: 400;

  font-size: 2.7rem;
}

.login-user,
.login-pass {
  border-radius: 50px;
  border: 1px solid var(--purple-color);

  padding: 10px;
  outline: none;

  background-color: var(--purple-color);

  color: #ffffff;

  width: 50%;
  height: 7%;
}

.login-user {
  margin: 20px auto 0;
}

.login-pass {
  margin: 10px auto 10px;
}

.reg-link {
  text-decoration: none;
  color: #938989;
  transition: all 2s ease;
}

.reg-link:hover {
  text-decoration: underline;
}

.login-btn {
  padding: 5px 10px 5px;
  margin: 1rem;
  outline: none;

  background-color: var(--purple-color);
  border: none;
  border-radius: 50px;
  cursor: pointer;

  width: 30%;
  height: 6%;

  background-color: var(--purple-color);

  color: #ffffff;

  transition: background-color 0.6s ease-out;
}

.login-btn:hover {
  background-color: #4742ae;
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
