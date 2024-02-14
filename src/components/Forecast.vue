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
  <div
    class="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md space-y-4"
  >
    <div v-if="isLoading" class="text-gray-500">Loading Forecast...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="w-full">
      <h2 class="text-xl font-semibold text-gray-800">24 hours forecast for {{ city }}</h2>
      <div class="flex flex-wrap justify-around gap-4 mt-4">
        <div
          v-for="entry in todayForecastDataList"
          :key="entry.id"
          class="flex flex-col items-center p-2 bg-blue-100 rounded-lg"
        >
          <img :src="getIconUrl(entry.icon)" alt="Weather icon" class="w-16 h-16" />
          <p class="text-lg font-medium text-gray-700">{{ entry.hour }}:00</p>
          <p class="text-lg text-gray-800">{{ entry.temp }}°</p>
        </div>
      </div>
      <h2 class="text-xl font-semibold text-gray-800 mt-6">5 days forecast for {{ city }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4">
        <div
          v-for="entry in fiveDaysForecastDataList"
          :key="entry.id"
          class="flex flex-col items-center p-2 bg-blue-200 rounded-lg"
        >
          <img :src="getNightIconUrl(entry.icon)" alt="Weather icon" class="w-16 h-16" />
          <p class="text-lg font-medium text-gray-700">{{ entry.day }}</p>
          <p class="text-sm text-gray-600">{{ `Min ${entry.min}° / Max ${entry.max}°` }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
