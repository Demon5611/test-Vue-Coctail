
import axios from 'axios';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useCocktailStore = defineStore('cocktail', {
  state: () => ({
    cocktails: reactive([]),
  }),
  actions: {
    async fetchCocktails(cocktailCode) {
      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailCode}`);
        const data = response.data;
        if (data.drinks && data.drinks.length > 0) {
          this.cocktails = reactive(data.drinks);
        } else {
          console.error('No drinks found for the specified search term');
        }
      } catch (error) {
        console.error('Error fetching cocktail data:', error);
      }
    },
  },
});

