import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

/**
 * Pinia store that manages weather data.
 * @returns {object} The Pinia store with the state and actions for weather data.
 */

export const useWeatherStore = defineStore('weather', () => {
  const weatherData = ref([]);
  const forecastData = ref(null);
  const mapData = ref(null);
  /**
   * Updates the weatherData state with new data.
   * @param {object} newData - The new weather data to update the state with.
   */
  function updateWeatherData(data) {
    weatherData.value = data;
  }
  function updateForecastData(data) {
    forecastData.value = data;
    console.log(forecastData.value);
  }

  function updateMapData(data) {
    mapData.value = data;
  }

  function getWeatherIcon(data) {
    if (data.value.weather.length > 1) {
      const lastItem = data.value.weather[data.value.weather.length - 1].icon;
      return `https://openweathermap.org/img/wn/${lastItem}@2x.png`;
    } else return `https://openweathermap.org/img/wn/${data.value.weather[0].icon}@2x.png`;
  }

  const weatherIconUrl = computed(() => {
    return getWeatherIcon(weatherData);
  });

  return {
    weatherData,
    forecastData,
    mapData,
    weatherIconUrl,
    updateWeatherData,
    updateForecastData,
    updateMapData,
    getWeatherIcon
  };
});
