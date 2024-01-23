<template>
    <div class="container">
        <div class="list-pages">
            <ul>
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
        </div>

        <router-view></router-view>
    </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 600px;
  width: 1024px;
  background-color: bisque;
  border: 1px solid black;
  box-sizing: border-box;
  position: relative; /* Добавьте позиционирование для использования z-index */
}

.list-pages {
  flex: 1;
  padding: 5%;
  border: 1px solid black;

}

ul {
  list-style: none;
  padding: 0;
}

ul li a {
  text-decoration: none;
  color: inherit;
}

.list-pages li {
  transition: background-color 0.3s ease;
}

.list-pages li:hover {
  background-color: rgba(128, 128, 128, 0.5);
}

.cocktail-page {
  flex: 1;
  margin: 5%;
  margin-right: 30%;
  position: relative;
  background-image: url("background-image-url.jpg"); /* Замените на URL вашего фонового изображения */
  background-size: cover;
  background-position: center;
  color: rgb(5, 5, 5); /* Добавьте белый цвет текста для лучшей видимости */
  overflow: auto; /* Добавьте прокрутку, если содержимое страницы превышает высоту */
}
</style>
