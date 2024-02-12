import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWeatherStore = defineStore('weather', () => {
  const weatherData = ref([]);

  function updateWeatherData(data) {
    weatherData.value = data;
  }
  console.log(weatherData.value);
  return { weatherData, updateWeatherData };
});
