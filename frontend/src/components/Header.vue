<template>
  <header class="header">
    <nav class="nav-menu">
      <router-link to="/home"
        ><p><a class="url-link">Home</a></p></router-link
      >
      <router-link to="/perfil"
        ><p><a class="url-link">Perfil</a></p></router-link
      >
      <p><a class="url-link">Buscar estudante</a></p>
      <p><a class="url-link" @click="deslogar">Sair</a></p>
    </nav>
  </header>
</template>

<script></script>

<style scoped>
a {
  text-decoration: none !important;
}

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
</style>
