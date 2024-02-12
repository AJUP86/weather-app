<script setup>
/**
 * Forecast component that displays current weather data.
 * It fetches weather data for a hardcoded city using the OpenWeatherMap API.
 * The API URL is constructed as a computed property based on environment variables and city name.
 * It uses the `useFetch` composable to perform the API call and the `useWeatherStore` store to manage the state.
 */
import { computed, ref, watchEffect } from 'vue';
import { useFetch } from '../composables/fetch.js';
import { useWeatherStore } from '../stores/weather.js';
const WEATHER_API = import.meta.env.VITE_WEATHER_API;
const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
const city = ref('Amsterdam');
const units = 'metric';
const store = useWeatherStore();

/**
 * Computed property that constructs the API URL.
 * This will automatically update if any reactive dependencies change.
 */
const apiUrl = computed(
  () => `${WEATHER_BASE_URL}weather?q=${city.value}&appid=${WEATHER_API}&units=${units}`
);
/**
 * Fetches data from the API using the computed apiUrl and updates the Pinia store with the response.
 * @type {Object} Contains the data, error, and isLoading reactive references.
 */
const { data, error, isLoading } = useFetch(apiUrl);

watchEffect(() => {
  if (data.value) {
    store.updateWeatherData(data.value);
  }
});
</script>

<template>
  <div v-if="isLoading">Loading weather data...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else>
    <h2>Weather Forecast for {{ city }}</h2>
    <div v-if="store.weatherData">
      {{ store.weatherData.main.temp }}
    </div>
    <div v-else>No weather data available.</div>
  </div>
</template>
