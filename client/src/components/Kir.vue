<template>
    <div>
  <h1 @click="reloadCocktails('kir')">{{ form.data?.strDrink }}</h1>
  
  <div v-if="form.data && Object.keys(form.data).length > 0">
  <p v-if="form.data.strCategory">{{ form.data.strCategory }}</p>
  </div>
  <div v-if="form.data && Object.keys(form.data).length > 0">
  <p v-if="form.data.strCategory">{{ form.data.strAlcoholic }}</p>
  </div>
  <div v-if="form.data && Object.keys(form.data).length > 0">
  <p v-if="form.data.strCategory">{{ form.data.strGlass }}</p>
  </div>
  
  <div v-if="form.data && Object.keys(form.data).length > 0">
      <p v-if="form.data.strGlass">Instructions :{{ form.data.strInstructions }}</p>
    </div>

    <div class="thumbnail-container">
  <img v-if="form.data && form.data.strDrinkThumb" :src="form.data.strDrinkThumb" alt="kir Thumbnail" />
  </div>
  
  <h3>List of Ingredients:</h3>
  <ul v-if="form.data && Object.keys(form.data).length > 0">
  <li v-for="(measure, index) in ingredientMeasures" :key="index">
    <span>measure:{{ index +1 }}</span>
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
  
  
  onMounted(async () => {
    await cocktailStore.fetchCocktails('kir');
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
  