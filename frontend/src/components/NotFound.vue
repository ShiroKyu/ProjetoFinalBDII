<template>
  <router-view>
    <section class="notFoundMessage">
      <div class="message-img"></div>

      <div class="message">
        <h1>404 Not Found</h1>
        <p>Nós não encontramos a página que você está procurando</p>

        <router-link class="back-link" to="/"><a>Voltar</a></router-link>
      </div>
    </section>
  </router-view>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notFoundMessage {
  width: 100%;
  height: 100%;

  display: flex;

  justify-content: space-around;
  align-items: center;
}

.message {
  display: flex;
  flex-direction: column;
}

.message-img {
  width: 400px;
  height: 400px;

  background-size: cover;
  background-image: url('../../public/img/404page.png');
}

.message h1 {
  font-size: 3rem;
  color: #a8abb3;
}

.message p {
  font-size: 1rem;
  color: #565656;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.back-link {
  text-decoration: none;

  background-color: var(--purple-color);
  color: white;
  border-radius: 5px;
  border: 1px solid var(--purple-color);
  padding: 10px;
  align-self: center;
}
</style>
