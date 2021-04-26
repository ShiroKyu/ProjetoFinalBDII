<template>
  <router-view>
    <section class="login-cover"></section>

    <section class="login-field">
      <form class="login-form" method="POST" @submit.prevent="getRes">
        <h1>Registre-se</h1>

        <input type="email" placeholder="Email" class="login-user" v-model="email" />
        <input type="text" placeholder="Matrícula" class="login-user" v-model="matricula" />
        <input type="password" placeholder="Senha" class="login-pass" v-model="password" />
        <!-- <label for="data-nasc"
          >Data de nascimento: <input id="data-nasc" type="date" placeholder="data"
        /></label> -->
        <button type="submit" class="login-btn">Criar</button>
      </form>
    </section>
  </router-view>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

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

      axios
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
    axios
      .get('http://localhost:3333/auth/checklogin')
      .then((response) => {
        if (response.status === 200) {
          this.$router.push({ path: '/home' });
          this.toast.success('Logado!', {
            timeout: 4000,
          });
        }
      })
      .catch(() => {
        // this.$router.push({ path: '/register' });
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-cover {
  width: 50%;
  height: 100%;
  background-color: var(--purple-color);
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
  margin: 10px auto 0;
}

.login-pass {
  margin: 10px auto 10px;
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

  background-color: #ff6584;

  color: #ffb9b9;

  transition: background-color 0.3s ease-out;
}

.login-btn:hover {
  background-color: #f33f63;
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
