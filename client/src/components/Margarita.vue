<template>
  <div>
    <h1 @click="reloadCocktail">Cocktail: {{ form.data?.strDrink }}</h1>

    <div v-if="form.data && Object.keys(form.data).length > 0">
      <p v-if="form.data.strCategory">Category: {{ form.data.strCategory }}</p>
    </div>

    <div>
      <img v-if="form.data && form.data.strDrinkThumb" :src="form.data.strDrinkThumb" alt="Cocktail Thumbnail" />
    </div>

    <h3>List of Ingredients:</h3>
    <ul>
      <li v-for="(measure, index) in ingredientMeasures" :key="index">
        <span>measure:{{ measure }}</span>
        <span>{{ form.data?.[`strIngredient${index + 1}`] }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useCocktailStore } from '../stores/store';

const cocktailStore = useCocktailStore();

const form = ref({
  data: {
    strDrink: '',
    strCategory: '',
    strDrinkThumb: '', // Add the strDrinkThumb property for the cocktail image URL
  },
});

console.log('Form initial:', form);

onMounted(async () => {
  await cocktailStore.fetchCocktail();
  console.log('Cocktail after fetch:', cocktailStore.cocktail);
  form.value.data = { ...cocktailStore.cocktail }; // Set initial form data
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

// Watch for changes in form.value.data and log them
watch(() => form.value.data, (newData) => {
  console.log('Form data updated:', newData);
});

const reloadCocktail = async () => {
  await cocktailStore.fetchCocktail();
  form.value.data = { ...cocktailStore.cocktail }; // Update form data on reload
  console.log('Cocktail after reloadCocktail==>:', form.value.data);
};
</script>
