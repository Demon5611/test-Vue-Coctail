// store.js
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import axios from 'axios';

export const useCocktailStore = defineStore('cocktail', {
  state: () => ({
    cocktail: reactive({ idDrink: '', strDrink: '', strCategory: '' }),
  }),
  actions: {
    async fetchCocktail() {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
        const data = response.data;
        if (data.drinks && data.drinks.length > 0) {
          Object.assign(this.cocktail, data.drinks[0]);
        } else {
          console.error('No drinks found for the specified search term');
        }
      } catch (error) {
        console.error('Error fetching cocktail data:', error);
      }
    },
  },
});
