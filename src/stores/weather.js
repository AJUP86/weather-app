import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Pinia store that manages weather data.
 * @returns {object} The Pinia store with the state and actions for weather data.
 */

export const useWeatherStore = defineStore('weather', () => {
  const weatherData = ref([]);

  /**
   * Updates the weatherData state with new data.
   * @param {object} newData - The new weather data to update the state with.
   */
  function updateWeatherData(data) {
    weatherData.value = data;
  }
  console.log(weatherData.value);
  return { weatherData, updateWeatherData };
});
