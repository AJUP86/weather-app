import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCityStore = defineStore('city', () => {
  const currentCity = ref('');
  const cities = ref([]);
  const selectedCities = ref([]);
  const isMenuOpen = ref(false);

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
    isMenuOpen,
    currentCity,
    cities,
    selectedCities,
    updateCities,
    setCurrentCity,
    setSelectedCities
  };
});
