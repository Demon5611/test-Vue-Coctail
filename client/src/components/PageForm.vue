<script setup>

</script>

<template>
    <div class="container">
      <ul class="list-pages">
        <li>
          <router-link to="/Margarita">Margarita</router-link>
        </li>
        <li>
          <router-link to="/Mojito">Mojito</router-link>
        </li>
        <li>
          <router-link to="/A1">A1</router-link>
        </li>
        <li>
          <router-link to="/Kir">Kir</router-link>
        </li>
      </ul>
  
      <router-view></router-view>
    </div>
  </template>

<style scoped>

.container{
    height: 600px;
    width: 1024px;
    background-color: bisque;
    border: 1px solid black; 
    box-sizing: border-box; 
}
.list-pages {
    height: 100%;
    width: 25%;
    list-style: none;
    padding: 0;    
}

ul{
    margin-top: 10%;
    margin-left: 10%;
    text-decoration-line: none;
}
ul li a {
    text-decoration: none; /* Убираем подчеркивание ссылок */
    color: inherit; /* Наследуем цвет текста от родительского элемента */
}
.list-pages li {

    transition: background-color 0.3s ease; 
}

.list-pages li:hover {
    background-color: rgba(128, 128, 128, 0.5);
}








@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
