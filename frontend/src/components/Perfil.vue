<template>
  <router-view>
    <section>
      <div class="main">
        <div class="perfil" v-for="(perfil, index) in informacoes_perfil" :key="index">
          <div>
            <img class="perfil_img" :src="perfil.foto_url" alt="Foto aluno" />
          </div>
          <div class="perfil_informacoes">
            <h2>{{ perfil.nome }}</h2>
            <p>{{ perfil.matricula }}</p>
            <p>{{ perfil.curso }}</p>
            <p>{{ perfil.campus }}</p>
            <p>{{ perfil.situacao }}</p>
          </div>
        </div>
      </div>
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
  align-items: center;
  justify-content: center;
  background-color: #6c63ff;
  height: 100vh;
  width: 100vw;
}
.perfil {
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.5);
}
.perfil_informacoes {
  margin-top: 15px;
  margin-right: 25px;
}
.perfil_img {
  width: 150px;
  margin: 15px;
}
</style>
