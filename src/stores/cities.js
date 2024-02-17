import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCityStore = defineStore('city', () => {
  const currentCity = ref('');
  const cities = ref([]);
  const selectedCities = ref([]);

  function updateCities(newCities) {
    cities.value = newCities;
  }

  function setCurrentCity(city) {
    currentCity.value = city;
  }

  function setSelectedCities(city) {
    selectedCities.value = city;
  }

  return {
    currentCity,
    cities,
    selectedCities,
    updateCities,
    setCurrentCity,
    setSelectedCities
  };
});
