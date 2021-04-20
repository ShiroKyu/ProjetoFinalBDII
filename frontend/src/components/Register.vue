<template>
  <router-view>
    <section class="login-cover"></section>

    <section class="login-field">
      <form class="login-form">
        <h1>Registre-se</h1>

        <input type="text" placeholder="Usuário" class="login-user" />
        <input type="email" placeholder="Email" class="login-user" />
        <input type="text" placeholder="Matrícula" class="login-user" />
        <input type="password" placeholder="Senha" class="login-pass" />
        <label for="data-nasc"
          >Data de nascimento: <input id="data-nasc" type="date" placeholder="data"
        /></label>
        <button type="submit" class="login-btn">Entrar</button>
      </form>
    </section>
  </router-view>
</template>

<script>
export default {
  name: 'Register',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-cover {
  width: 50%;
  height: 100%;
  background-color: #6c63ff;
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
