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
  () => `${WEATHER_BASE_URL}forecast?q=${city.value}&appid=${WEATHER_API}&units=${units}`
);
/**
 * Fetches data from the API using the computed apiUrl and updates the Pinia store with the response.
 * @type {Object} Contains the data, error, and isLoading reactive references.
 */
const { data, error, isLoading } = useFetch(apiUrl);

watchEffect(() => {
  if (data.value) {
    store.updateForecastData(data.value);
  }
});
const getDayAbbreviation = (date) => {
  const dayIndex = date.getDay();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return dayNames[dayIndex];
};
function getIconUrl(iconCode) {
  console.log(iconCode);
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function getNightIconUrl(iconCode) {
  const trimmedIcon = iconCode.slice(0, -1);
  return `https://openweathermap.org/img/wn/${trimmedIcon}d@2x.png`;
}
const todayForecastDataList = computed(() => {
  return (
    store.forecastData.list?.slice(0, 9).map((entry) => {
      const entryDate = new Date(entry.dt_txt);
      return {
        id: Math.floor(Math.random() * 100000),
        hour: entryDate.getHours(),
        temp: entry.main.temp,
        icon: entry.weather[0].icon
      };
    }) || []
  );
});
const fiveDaysForecastDataList = computed(() => {
  const todayString = new Date().toDateString();
  const groupedByDay = store.forecastData.list?.reduce((acc, entry) => {
    const date = new Date(entry.dt_txt);
    const dayKey = date.toDateString(); // Unique key for each day
    const dayAbbreviation = getDayAbbreviation(date);

    if (!acc[dayKey]) {
      acc[dayKey] = {
        id: date.toISOString(),
        day: dayKey === todayString ? 'Today' : dayAbbreviation,
        min: entry.main.temp_min,
        max: entry.main.temp_max,
        icon: entry.weather[0].icon
      };
    } else {
      acc[dayKey].min = Math.min(acc[dayKey].min, entry.main.temp_min);
      acc[dayKey].max = Math.max(acc[dayKey].max, entry.main.temp_max);
    }

    return acc;
  }, {});

  // Convert the accumulated object into an array and return it
  return Object.values(groupedByDay);
});
</script>

<template>
  <div v-if="isLoading">Loading Forecast...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else>
    <div v-if="todayForecastDataList">
      <h2>24 hours forecast for {{ city }}</h2>
      <div v-for="entry in todayForecastDataList" :key="entry.id">
        <p>{{ entry.hour }}: {{ entry.temp }}°</p>
        <img :src="getIconUrl(entry.icon)" alt="Weather icon" />
      </div>
    </div>
    <div v-else>No weather data available.</div>
    <div v-if="fiveDaysForecastDataList">
      <h2>5 days forecast for {{ city }}</h2>
      <div v-for="entry in fiveDaysForecastDataList" :key="entry.id">
        <p>{{ entry.day }}: {{ entry.min }}° {{ entry.max }}°</p>
        <img :src="getNightIconUrl(entry.icon)" alt="" />
      </div>
    </div>
  </div>
</template>
