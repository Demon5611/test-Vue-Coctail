<template>
    <div class="cocktail-page">
        <h1>{{ form.data?.strDrink }}</h1>
        <br />
        <div v-if="form.data && Object.keys(form.data).length > 0">
            <p v-if="form.data.strCategory">Category: {{ form.data.strCategory }}</p>
        </div>
  
        <div v-if="form.data && Object.keys(form.data).length > 0">
            <p v-if="form.data.strAlcoholic">{{ form.data.strAlcoholic }}</p>
        </div>

        <div v-if="form.data && Object.keys(form.data).length > 0">
            <p v-if="form.data.strGlass">{{ form.data.strGlass }}</p>
        </div>
        <br />
        <div v-if="form.data && Object.keys(form.data).length > 0">
            <p v-if="form.data.strGlass">Instructions :{{ form.data.strInstructions }}</p>
        </div>    
        <br />
        <h3>List of Ingredients:</h3>
        <ul v-if="form.data && Object.keys(form.data).length > 0">
            <li v-for="(measure, index) in ingredientMeasures" :key="index">
                <span>Measure {{ index + 1 }}:</span>
                <span>{{ measure }}</span>
            </li>
        </ul>
    
    </div>
    <div class="thumbnail-container">
        <img v-if="form.data && form.data.strDrinkThumb" :src="form.data.strDrinkThumb" alt="coctail Thumbnail" loading="lazy" />
    </div>
</template>
  
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCocktailStore } from '../stores/store';

const cocktailStore = useCocktailStore();
const route = useRoute();

const form = ref({
  data: {
    strDrink: '',
    strCategory: '',
    strAlcoholic: '',
    strGlass: '',
    strDrinkThumb: '',
  },
});

onMounted(reloadCocktails);

watch(() => route.params.cocktailName, (newCocktailName) => {
  console.log('New cocktail name:', newCocktailName);
  reloadCocktails(newCocktailName);
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

async function reloadCocktails(newCocktailName = 'margarita') {
  console.log('Reloading cocktails for:', newCocktailName);
  await cocktailStore.fetchCocktails(newCocktailName);
  console.log('Fetched cocktails:', cocktailStore.cocktails);
  
  if (cocktailStore.cocktails.length > 0) {
    Object.assign(form.value.data, cocktailStore.cocktails[0]);
  } else {
    console.error('No drinks found for the specified search term');
  }
}

</script>
