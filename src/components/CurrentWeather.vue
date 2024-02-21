<script setup>
import { computed, watch, defineProps } from 'vue';
import { useFetch } from '../composables/fetch.js';
import { useWeatherStore } from '../stores/weather.js';
import Loading from './Loading.vue';

const props = defineProps({
  city: String
});

const WEATHER_API = import.meta.env.VITE_WEATHER_API;
const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
const WEATHER_DATA = import.meta.env.VITE_WEATHER_DATA;
const store = useWeatherStore();

const apiUrl = computed(
  () =>
    `${WEATHER_BASE_URL}${WEATHER_DATA}weather?q=${props.city}&appid=${WEATHER_API}&units=${store.isCelsius ? 'metric' : 'imperial'}`
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
const cityName = computed(() => weatherData.value?.name || props.city);
// Time of day determination logic
const isDay = computed(() => {
  if (!weatherData.value) return true;
  const sunrise = new Date(weatherData.value.sys.sunrise * 1000);
  const sunset = new Date(weatherData.value.sys.sunset * 1000);
  const currentTime = new Date();
  return currentTime >= sunrise && currentTime <= sunset;
});

// Weather condition and background logic
const textColorOnBackground = computed(() => {
  const isBackgroundDark = [
    'bg-rain-night',
    'bg-clear-night',
    'bg-thunderstorm-night',
    'bg-mist-night',
    'bg-clouds-night'
  ].includes(weatherConditionBackground.value);
  return isBackgroundDark ? 'text-onDark' : 'text-onLight';
});
const weatherCondition = computed(() => weatherData.value?.weather[0]?.main.toLowerCase() || '');
const weatherConditionBackground = computed(() => {
  switch (weatherCondition.value) {
    case 'rain':
      return isDay.value ? 'bg-rain-day' : 'bg-rain-night';
    case 'clear':
      return isDay.value ? 'bg-clear-day' : 'bg-clear-night';
    case 'snow':
      return isDay.value ? 'bg-snow-day' : 'bg-snow-night';
    case 'clouds':
      return isDay.value ? 'bg-clouds-day' : 'bg-clouds-night';
    case 'thunderstorm':
      return isDay.value ? 'bg-thunderstorm-day' : 'bg-thunderstorm-night';
    case 'drizzle':
      return isDay.value ? 'bg-drizzle-day' : 'bg-drizzle-night';
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
    case 'sand':
    case 'ash':
    case 'squall':
    case 'tornado':
      return isDay.value ? 'bg-mist-day' : 'bg-mist-night';
    default:
      return isDay.value ? 'bg-default-day' : 'bg-default-night';
  }
});
</script>

<template>
  <div
    :class="[weatherConditionBackground, textColorOnBackground]"
    class="flex justify-center items-center p-5 overflow-hidden rounded-lg shadow-md space-y-4 w-full h-full transition-all"
  >
    <Transition name="fade" mode="out-in">
      <div v-if="isLoading" class="flex justify-center items-center">
        <Loading />
      </div>
      <div v-else-if="error" class="text-error">
        {{ error.message }}
      </div>
      <div v-else class="flex flex-col justify-center items-center w-full h-full">
        <h1 :class="textColorOnBackground" class="text-2xl font-bold">{{ cityName }}</h1>
        <div v-if="weatherData" class="flex flex-col items-center justify-center">
          <img :src="weatherIconUrl" :alt="weatherData.weather[0].description" class="w-20 h-20" />
          <h2 :class="textColorOnBackground" class="text-5xl font-semibold my-2">
            {{ weatherData.main.temp.toFixed(1) }}°
          </h2>

          <p :class="textColorOnBackground" class="text-xl">
            {{ weatherData.weather[0].main }}
          </p>
          <p :class="textColorOnBackground" class="text-md">
            L: {{ weatherData.main.temp_min.toFixed(1) }}° H:
            {{ weatherData.main.temp_max.toFixed(1) }}°
          </p>
        </div>
        <div v-else>No weather data available.</div>
      </div>
    </Transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
