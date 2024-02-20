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
const store = useWeatherStore();
const apiUrl = computed(
  () =>
    `${WEATHER_BASE_URL}${WEATHER_DATA}forecast?q=${props.city}&appid=${WEATHER_API}&units=${store.isCelsius ? 'metric' : 'imperial'}`
);

const { data, error, isLoading } = useFetch(apiUrl);

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
    class="flex flex-col items-center justify-center p-4 bg-white bg-opacity-75 rounded-lg shadow-md space-y-4 w-full"
  >
    <div v-if="isLoading" class="text-gray-500">Loading Forecast...</div>
    <div v-else-if="error" class="text-error">{{ error }}</div>
    <div v-else class="w-full">
      <h2 class="text-lg md:text-xl lg:text-2xl text-onBackground">24 hours forecast.</h2>
      <!-- Horizontal scroll container -->
      <div class="flex overflow-x-auto py-4 w-full">
        <!-- Inline forecast items -->
        <template v-for="entry in todayForecastDataList" :key="entry.id">
          <div class="flex-none flex flex-col items-center p-2">
            <img :src="entry.icon" alt="Weather icon" class="w-14 h-14" />
            <div class="text-xs sm:text-sm md:text-base text-onBackground">
              <p>{{ entry.hour }}h</p>
              <p>{{ entry.temp.toFixed(0) }}°</p>
            </div>
          </div>
        </template>
      </div>

      <!-- 5 days forecast -->
      <h2 class="text-lg md:text-xl lg:text-2xl text-onBackground">5 days forecast</h2>
      <div class="flex flex-col divide-y divide-primary">
        <div
          v-for="day in fiveDaysForecastDataList"
          :key="day.id"
          class="py-2 flex justify-between items-center"
        >
          <div class="flex items-center text-onBackground">
            <p class="text-lg font-medium mr-4">{{ day.day }}</p>
            <p class="text-sm">{{ `Min ${day.min.toFixed(1)}°` }}</p>
            <span class="mx-1 text-primary">|</span>
            <p class="text-sm">{{ `Max ${day.max.toFixed(1)}°` }}</p>
          </div>
          <!-- Adjusted size of weather icons -->
          <img :src="day.icon" alt="Weather icon" class="w-14 h-14" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Ensure images don't get cropped or stretched */
img {
  object-fit: contain;
  /* Adjust the size of the icons for better visibility */
  width: 3rem; /* Adjust the size as needed */
  height: 3rem; /* Adjust the size as needed */
}

/* For a responsive number of columns in the 24-hour forecast */
@media (min-width: 640px) {
  .grid-cols-4 {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .grid-cols-4 {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
}

/* For larger screens, adjust as needed */
@media (min-width: 1024px) {
  .grid-cols-4 {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
}
.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 640px) {
  /* Adjust the number of columns for larger screens */
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  /* For even larger screens, display more columns */
  .grid-cols-4 {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
}
</style>
