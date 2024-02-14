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
  <div class="p-5 max-w-sm bg-white rounded-lg border shadow-md">
    <div v-if="isLoading" class="animate-pulse">Loading weather data...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="text-center">
      <h1 class="text-xl font-bold">{{ city }}</h1>
      <div v-if="store.weatherData" class="my-4">
        <img :src="store.weatherIconUrl" alt="Weather icon" class="mx-auto" />
        <h1 class="text-4xl font-semibold">{{ `${store?.weatherData.main.temp}°` }}</h1>
        <h3 class="text-md text-gray-700">{{ store.weatherData.weather[0].main }}</h3>
        <p class="text-sm text-gray-500">
          {{ `L:${store.weatherData.main.temp_min}° H:${store.weatherData.main.temp_min}°` }}
        </p>
      </div>
      <div v-else>No weather data available.</div>
    </div>
  </div>
</template>
