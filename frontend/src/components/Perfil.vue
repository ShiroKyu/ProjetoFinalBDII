<template>
  <router-view>
    <section class="main">
      <section class="left-section">
        <div class="back-img"></div>

        <router-link class="back-link" to="/register"><a>&#8592; Voltar</a></router-link>

        <div class="profile-img-container">
          <div class="profile-img"></div>
        </div>

        <div class="update-password">
          <img width="30" height="30" src="../../public/img/lock.png" />
          <p>Alterar senha</p>
        </div>
      </section>

      <section class="right-section">
        <div class="student-info">
          <h2>Dados do estudante</h2>
          <p><b>Nome</b>: pasuddas</p>
          <p><b>E-mail</b>: pasuddas</p>
          <p><b>Matrícula</b>: pasuddas</p>
          <p><b>Situação</b>: pasuddas</p>
          <p><b>Curso</b>: pasuddas</p>
        </div>
      </section>
    </section>
  </router-view>
</template>
<script>
export default {
  data() {
    return {
      informacoes_perfil: [
        {
          nome: 'Lulu',
          matricula: '123123',
          curso: 'ADS',
          campus: 'Cajazeiras - Paraíba',
          situacao: 'Matriculada',
          foto_url: 'https://bityli.com/j1zBy',
        },
      ],
    };
  },
  name: 'Perfil',
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
  background-image: url('/img/ifpb.89f4ef8e.jpg');
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
  background-color: #ffffff;
}

.student-info {
  width: 100%;

  padding: 30px;

  text-align: center;

  border: 1px solid rgb(255, 255, 255);
  box-shadow: 2px 2px 6px black;

  background-color: #ffffff;
}

.student-info h2 {
  margin-bottom: 2rem;
}

.student-info p {
  padding: 8px;
}

.profile-img-container {
  width: 200px;
  height: 200px;
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
  background-color: #6c63ffa1;
  border-radius: 50%;

  width: 100px;
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: background-color 0.7s ease;

  color: #000000;
}

.update-password:hover {
  background-color: var(--purple-color);
}

.update-password p {
  font-size: 0.8rem;
}
</style>
