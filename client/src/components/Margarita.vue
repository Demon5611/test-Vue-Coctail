<template>
  <div>
<h1 @click="reloadCocktails('margarita')">Margarita: {{ form.data?.strDrink }}</h1>

<div v-if="form.data && Object.keys(form.data).length > 0">
<p v-if="form.data.strCategory">Category: {{ form.data.strCategory }}</p>
</div>

<div>
<img v-if="form.data && form.data.strDrinkThumb" :src="form.data.strDrinkThumb" alt="Margarita Thumbnail" />
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

console.log('Form initial Margarita:', form);

onMounted(async () => {
  await cocktailStore.fetchCocktails('margarita'); // Инициализация с начальным напитком (может быть изменено)
  Object.assign(form.value.data, cocktailStore.cocktails[0]);
});

const ingredientMeasures = computed(() => {
  const measures = [];
  for (let i = 1; i <= 15; i++) {
    const measure = form.value.data?.[`strMeasure${i}`];
    const ingredient = form.value.data?.[`strIngredient${i}`];
    if (measure && ingredient) {
      measures.push(`${measure} ${ingredient}`);
    }
  }
  return measures;
});

watch(() => form.value.data, (newData) => {
  console.log('Form data updated:', newData);
});


const reloadCocktails = async () => {
await cocktailStore.fetchCocktails();
// Теперь у вас есть массив коктейлей, выберите нужный коктейль, например, первый:
form.value.data = { ...cocktailStore.cocktails[0] };
console.log('Cocktail after reloadCocktails==>:', form.value.data);
};
</script>
