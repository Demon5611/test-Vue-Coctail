// store.js
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import axios from 'axios';

export const useCocktailStore = defineStore('cocktail', {
  state: () => ({
    cocktails: reactive([]),
  }),
  actions: {
    async fetchCocktails() {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
        const data = response.data;
        console.log('data===>', data);
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
