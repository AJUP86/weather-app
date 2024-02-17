<script setup>
import { computed, defineProps, watch } from 'vue';
import { useFetch } from '../composables/fetch.js';
import { useWeatherStore } from '../stores/weather.js';

const props = defineProps({
  city: String
});

const WEATHER_API = import.meta.env.VITE_WEATHER_API;
const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
const WEATHER_DATA = import.meta.env.VITE_WEATHER_DATA;
const units = 'metric';
const apiUrl = computed(
  () =>
    `${WEATHER_BASE_URL}${WEATHER_DATA}forecast?q=${props.city}&appid=${WEATHER_API}&units=${units}`
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
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
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

    if (dayKey === todayString || !forecastByDay[dayKey]) {
      forecastByDay[dayKey] = {
        id: entry.dt,
        day: getDayAbbreviation(entryDate),
        temps: [entry.main.temp_min, entry.main.temp_max],
        icon: getIconUrl(entry.weather[0].icon)
      };
    } else {
      forecastByDay[dayKey].temps.push(entry.main.temp_min, entry.main.temp_max);
    }
  });

  return Object.values(forecastByDay)
    .slice(0, 5)
    .map((day) => ({
      ...day,
      min: Math.min(...day.temps),
      max: Math.max(...day.temps)
    }));
});
</script>
<template>
  <div
    class="flex flex-col items-center justify-center p-4 bg-white bg-opacity-75 rounded-b-lg shadow-md space-y-4"
  >
    <div v-if="isLoading" class="text-gray-500">Loading Forecast...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="w-full">
      <h2 class="text-lg md:text-xl lg:text-2xl">24 hours forecast.</h2>
      <div class="flex space-x-2 overflow-x-auto py-4">
        <div class="flex items-center space-x-1">
          <div class="flex space-x-4 min-w-max">
            <template
              v-for="entry in todayForecastDataList"
              :key="entry.id"
              class="flex-none w-1/6 md:w-1/8 lg:w-1/10 flex flex-col items-center p-2"
            >
              <div class="flex flex-col items-center">
                <img :src="entry.icon" alt="Weather icon" class="w-6 h-6" />
                <div class="text-xs sm:text-sm md:text-base">
                  <p>{{ entry.hour }}</p>
                  <p>{{ entry.temp.toFixed(0) }}°</p>
                </div>

                <div class="h-1 w-px bg-primary"></div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <h2 class="text-lg md:text-xl lg:text-2xl">5 days forecast</h2>
      <div class="flex flex-col divide-y divide-gray-200">
        <div
          v-for="day in fiveDaysForecastDataList"
          :key="day.id"
          class="py-2 flex justify-between items-center"
        >
          <div class="flex items-center">
            <p class="text-lg font-medium text-gray-700 mr-4">{{ day.day }}</p>
            <p class="text-sm text-gray-600">{{ `Min ${day.min.toFixed(1)}°` }}</p>
            <span class="mx-1 text-gray-500">|</span>
            <p class="text-sm text-gray-600">{{ `Max ${day.max.toFixed(1)}°` }}</p>
          </div>
          <img :src="day.icon" alt="Weather icon" class="w-10 h-10" />
        </div>
      </div>
    </div>
  </div>
</template>
