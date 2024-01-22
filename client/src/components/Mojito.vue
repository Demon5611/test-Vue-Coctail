<template>
    <div>
<h1 @click="reloadCocktails">Mojito: {{ form.data?.strDrink }}</h1>

<div v-if="form.data && Object.keys(form.data).length > 0">
  <p v-if="form.data.strCategory">Category: {{ form.data.strCategory }}</p>
</div>

<div>
  <img v-if="form.data && form.data.strDrinkThumb" :src="form.data.strDrinkThumb" alt="Mojito Thumbnail" />
</div>

<h3>List of Ingredients:</h3>
<ul v-if="form.data && Object.keys(form.data).length > 0">
  <li v-for="(measure, index) in ingredientMeasures" :key="index">
    <span>measure:{{ measure }}</span>
    <span>{{ form.data?.[`strIngredient${index + 1}`] }}</span>
  </li>
</ul>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, ref, watch } from 'vue';
import { useCocktailStore } from '../stores/store';
  
  const cocktailStore = useCocktailStore();
  
  const form = ref({
    data: {
      strDrink: '',
      strCategory: '',
      strDrinkThumb: '',
    },
  });
  
  console.log('Form initial:', form);
  
  onMounted(async () => {
  await cocktailStore.fetchCocktails();
  console.log('Mojito after fetch:', cocktailStore.cocktails);

  // Обновляем данные формы только если есть коктейли
  if (cocktailStore.cocktails.length > 0) {
    // Присваиваем массив коктейлей в форму
    form.value.data = { ...cocktailStore.cocktails };
  }
});
  
const ingredientMeasures = computed(() => {
  const measures = [];
  const firstCocktail = form.value.data[1];

  if (firstCocktail) {
    for (let i = 1; i <= 15; i++) {
      const measure = firstCocktail[`strMeasure${i}`];
      const ingredient = firstCocktail[`strIngredient${i}`];
      if (measure && ingredient) {
        measures.push(`${measure} ${ingredient}`);
      }
    }
  }

  return measures;
});
  
  watch(() => form.value.data, (newData) => {
    console.log('Form data updated:', newData);
  });
  

  const reloadCocktails = async () => {
  await cocktailStore.fetchCocktails();

  // Убеждаемся, что есть коктейли в массиве
  if (cocktailStore.cocktails.length > 0) {
    // Обновляем данные формы только если есть коктейли
    form.value.data = { ...cocktailStore.cocktails[1] };
    console.log('Cocktail after reloadCocktails==>:', form.value.data);
  } else {
    console.error('No cocktails found');
  }
};
  </script>
  