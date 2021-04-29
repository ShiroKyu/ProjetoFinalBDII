<template>
  <section class="main">
    <router-link class="back-link" to="/home"><a>&#8592; Voltar</a></router-link>
    <div class="search">
      <form class="search-container" action="/action_page.php">
        <input type="text" placeholder="Search.." name="search" />
        <button type="submit"><i class="button-search"></i></button>
      </form>
    </div>
  </section>
</template>

<script></script>

<style scoped>
main {
  display: flex;

  height: 100%;
  width: 100%;

  font-family: 'Quicksand', sans-serif;
  font-weight: 400;
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
.search-container {
  display: flex;
  justify-content: center;
  margin-left: 42vw;
  margin-top: 10px;
}
.search-container input[type='text'] {
  padding: 6px;
  margin-top: 8px;
  font-size: 17px;
  border: none;
}

.search-container button {
  float: right;
  padding: 6px 10px;
  margin-top: 8px;
  margin-right: 16px;
  background: #ddd;
  font-size: 17px;
  border: none;
  cursor: pointer;
}

.search-container button:hover {
  background: #ccc;
}
</style>
