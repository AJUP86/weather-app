<script setup>
import { computed, defineProps, watch } from 'vue';
import { useFetch } from '../composables/fetch.js';
import { useWeatherStore } from '../stores/weather.js';

const props = defineProps({
  city: String
});

const WEATHER_API = import.meta.env.VITE_WEATHER_API;
const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
const units = 'metric';
const apiUrl = computed(
  () => `${WEATHER_BASE_URL}forecast?q=${props.city}&appid=${WEATHER_API}&units=${units}`
);

const { data, error, isLoading } = useFetch(apiUrl);
const store = useWeatherStore();

watch(
  data,
  (newData) => {
    if (newData) {
      store.updateForecastData(props.city, newData);
    }
  },
  { deep: true }
);

const forecastData = computed(() => store.getForecastData(props.city));

const getIconUrl = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

const getNightIconUrl = (iconCode) => {
  const trimmedIcon = iconCode.slice(0, -1) + 'd';
  return `https://openweathermap.org/img/wn/${trimmedIcon}@2x.png`;
};

const todayForecastDataList = computed(
  () =>
    forecastData.value?.list?.slice(0, 8).map((entry) => {
      const entryDate = new Date(entry.dt_txt);
      return {
        id: entry.dt,
        hour: entryDate.getHours(),
        temp: entry.main.temp,
        icon: getIconUrl(entry.weather[0].icon)
      };
    }) || []
);
const getDayAbbreviation = (date) => {
  const dayIndex = date.getDay();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return dayNames[dayIndex];
};
const fiveDaysForecastDataList = computed(() => {
  const todayString = new Date().toDateString();
  const forecastByDay = {};

  forecastData.value?.list?.forEach((entry) => {
    const entryDate = new Date(entry.dt_txt);
    const dayKey = entryDate.toDateString();

    if (dayKey !== todayString) {
      if (!forecastByDay[dayKey]) {
        forecastByDay[dayKey] = {
          id: entry.dt,
          day: getDayAbbreviation(entryDate),
          temps: [entry.main.temp_min, entry.main.temp_max],
          icon: getNightIconUrl(entry.weather[0].icon)
        };
      } else {
        forecastByDay[dayKey].temps.push(entry.main.temp_min, entry.main.temp_max);
      }
    }
  });

  return Object.values(forecastByDay).map((day) => ({
    ...day,
    min: Math.min(...day.temps),
    max: Math.max(...day.temps)
  }));
});
</script>
<template>
  <div
    class="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md space-y-4 bg-gradient-to-r from-primary to-secondary"
  >
    <div v-if="isLoading" class="text-gray-500">Loading Forecast...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="w-full">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        24 hours forecast for {{ props.city }}
      </h2>
      <div class="flex flex-wrap justify-around gap-4">
        <div
          v-for="entry in todayForecastDataList"
          :key="entry.id"
          class="flex flex-col items-center p-2 bg-blue-100 rounded-lg w-24 h-32"
        >
          <img :src="entry.icon" alt="Weather icon" class="w-16 h-16" />
          <p class="text-lg font-medium text-gray-700">{{ entry.hour }}:00</p>
          <p class="text-lg text-gray-800">{{ entry.temp }}°C</p>
        </div>
      </div>
      <h2 class="text-xl font-semibold text-gray-800 mt-6">5 days forecast for {{ props.city }}</h2>
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4">
        <div
          v-for="day in fiveDaysForecastDataList"
          :key="day.id"
          class="flex flex-col items-center p-2 bg-blue-200 rounded-lg w-32 h-40"
        >
          <img :src="day.icon" alt="Weather icon" class="w-16 h-16" />
          <p class="text-lg font-medium text-gray-700">{{ day.day }}</p>
          <p class="text-sm text-gray-600">{{ `Min ${day.min}°C / Max ${day.max}°C` }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
