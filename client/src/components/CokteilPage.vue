<template>
    <div class="cocktail-page">
        <h1>{{ form.data?.strDrink }}</h1>
        <div v-if="!cocktailDataAvailable">
            <router-link :to="{ name: 'NotFound' }">Go to NotFound</router-link>
        </div>
        <div v-else>
            <div v-if="Object.keys(form.data).length > 0">
                <p v-if="form.data.strCategory">Category: {{ form.data.strCategory }}</p>
                <p v-if="form.data.strAlcoholic">{{ form.data.strAlcoholic }}</p>
                <p v-if="form.data.strGlass">{{ form.data.strGlass }}</p>
                <p v-if="form.data.strInstructions">Instructions: {{ form.data.strInstructions }}</p>
            </div>
            <br />
            <h3>List of Ingredients:</h3>
            <ul v-if="Object.keys(form.data).length > 0">
                <li v-for="(measure, index) in ingredientMeasures" :key="index">
                    <span>Measure {{ index + 1 }}:</span>
                    <span>{{ measure }}</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="thumbnail-container">
        <img v-if="form.data?.strDrinkThumb" :src="form.data.strDrinkThumb" alt="cocktail Thumbnail" loading="lazy" />
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router'; // Change this line
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
    strInstructions: '',
  },
});

const cocktailDataAvailable = computed(() => form.value.data !== undefined);

onMounted(reloadCocktails);

watch(() => route.params.cocktailName, (newCocktailName) => {
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
  await cocktailStore.fetchCocktails(newCocktailName);

  if (Array.isArray(cocktailStore.cocktails) && cocktailStore.cocktails.length > 0) { 
    Object.assign(form.value.data, cocktailStore.cocktails[0]);
  } else {
    
    route.push({ name: 'NotFound' });
    console.error('No drinks found for the specified search term');
  }
}
</script>
