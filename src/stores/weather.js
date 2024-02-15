import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

/**
 * Pinia store that manages weather data.
 * @returns {object} The Pinia store with the state and actions for weather data.
 */

export const useWeatherStore = defineStore('weather', () => {
  const weatherDataByCity = ref({});
  const forecastDataByCity = ref({});
  /**
   * Updates the weatherData state with new data.
   * @param {object} newData - The new weather data to update the state with.
   */
  function updateWeatherData(city, newData) {
    weatherDataByCity.value[city] = newData;
  }

  function updateForecastData(city, newData) {
    forecastDataByCity.value[city] = newData;
  }

  function getWeatherData(city) {
    return weatherDataByCity.value[city] || null;
  }

  function getForecastData(city) {
    return forecastDataByCity.value[city] || null;
  }

  function getWeatherIconUrl(city) {
    const data = weatherDataByCity.value[city];
    if (data && data.weather && data.weather.length > 0) {
      const iconCode = data.weather[0].icon;
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }
    return '';
  }

  return {
    weatherDataByCity,
    forecastDataByCity,
    updateWeatherData,
    updateForecastData,
    getWeatherData,
    getForecastData,
    getWeatherIconUrl
  };
});
