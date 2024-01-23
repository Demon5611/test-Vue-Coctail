<template>
  <div class="cocktail-page">
    <h1 @click="reloadCocktails('margarita')">{{ form.data?.strDrink }}</h1>

    <div v-if="form.data && Object.keys(form.data).length > 0">
      <p v-if="form.data.strCategory">Category: {{ form.data.strCategory }}</p>
    </div>

    <div v-if="form.data && Object.keys(form.data).length > 0">
      <p v-if="form.data.strAlcoholic">{{ form.data.strAlcoholic }}</p>
    </div>

    <div v-if="form.data && Object.keys(form.data).length > 0">
      <p v-if="form.data.strGlass">{{ form.data.strGlass }}</p>
    </div>

    <div v-if="form.data && Object.keys(form.data).length > 0">
      <p v-if="form.data.strGlass">Instructions :{{ form.data.strInstructions }}</p>
    </div>    
    <h3>List of Ingredients:</h3>
    <ul v-if="form.data && Object.keys(form.data).length > 0">
      <li v-for="(measure, index) in ingredientMeasures" :key="index">
        <span>Measure {{ index + 1 }}:</span>
        <span>{{ measure }}</span>
      </li>
    </ul>
    
  </div>
  <div class="thumbnail-container">
    <img v-if="form.data && form.data.strDrinkThumb" :src="form.data.strDrinkThumb" alt="Margarita Thumbnail" />
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
    strAlcoholic: '',
    strGlass: '',
    strDrinkThumb: '',
  },
});

onMounted(async () => {
  await cocktailStore.fetchCocktails('margarita');
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
  form.value.data = { ...cocktailStore.cocktails[0] };
};
</script>

<style>
.cocktail-page {
  width: 30%;;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 40%;
  position: relative;
}

.thumbnail-container {
  position: absolute;
  top: 10%;
  right: 10%;
  width: 200px;
  height: 200px;
  z-index: 1; /* Установите значение z-index для поднятия над контентом */
}

.thumbnail-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

</style>
