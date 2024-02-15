<script setup>
import { computed, ref, watch } from 'vue';
import { useFetch } from '../composables/fetch.js';
import { useWeatherStore } from '../stores/weather.js';
import { defineProps } from 'vue';

const props = defineProps({
  city: String
});
const WEATHER_API = import.meta.env.VITE_WEATHER_API;
const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
const units = 'metric';
const store = useWeatherStore();

const apiUrl = computed(
  () => `${WEATHER_BASE_URL}weather?q=${props.city}&appid=${WEATHER_API}&units=${units}`
);
const { data, error, isLoading } = useFetch(apiUrl);

watch(
  data,
  (newData) => {
    if (newData) {
      store.updateWeatherData(props.city, newData);
    }
  },
  { deep: true }
);

const weatherData = computed(() => store.getWeatherData(props.city));
const weatherIconUrl = computed(() => store.getWeatherIconUrl(props.city));

const isDay = computed(() => {
  if (!weatherData.value) return true; // Default to day if no data
  const sunrise = new Date(weatherData.value.sys.sunrise * 1000);
  const sunset = new Date(weatherData.value.sys.sunset * 1000);
  const currentTime = new Date();
  return currentTime > sunrise && currentTime < sunset;
});

const weatherBackground = computed(() => {
  return isDay.value ? 'bg-day' : 'bg-night';
});

const weatherCondition = computed(() => {
  if (!weatherData.value || !weatherData.value.weather || weatherData.value.weather.length === 0)
    return '';
  return weatherData.value.weather[0].main.toLowerCase();
});

const weatherConditionBackground = computed(() => {
  switch (weatherCondition.value) {
    case 'rain':
      return 'bg-rain';
    case 'clear':
      return 'bg-clear-sky';
    case 'snow':
      return 'bg-snow';
    case 'clouds':
      return 'bg-scattered-clouds';
    case 'thunderstorm':
      return 'bg-thunderstorm';
    case 'drizzle':
      return 'bg-shower-rain';
    case 'mist' || 'smoke' || 'haze' || 'dust' || 'fog' || 'sand' || 'ash' || 'squall' || 'tornado':
      return 'bg-mist';
    default:
      return '';
  }
});
</script>

<template>
  <div
    :class="[weatherBackground, weatherConditionBackground]"
    class="p-5 bg-white overflow-hidden rounded-t-lg border shadow-md space-y-4"
  >
    <div v-if="isLoading" class="animate-pulse text-gray-500">Loading weather data...</div>
    <div v-else-if="error" class="text-error">{{ error }}</div>
    <div v-else class="text-center">
      <h1 class="text-xl font-bold text-primary">{{ props.city }}</h1>
      <div v-if="weatherData" class="my-4">
        <img :src="weatherIconUrl" alt="Weather icon" class="mx-auto w-20 h-20" />
        <h1 class="text-4xl font-semibold text-primary">
          {{ `${weatherData.main.temp.toFixed(1)}°` }}
        </h1>
        <h3 class="text-md text-darkGray">{{ weatherData.weather[0].main }}</h3>
        <p class="text-sm text-darkGray">
          {{
            `L:${weatherData.main.temp_min.toFixed(1)}° H:${weatherData.main.temp_max.toFixed(1)}°`
          }}
        </p>
      </div>
      <div v-else>No weather data available.</div>
    </div>
  </div>
</template>
