<script setup>
import { defineProps } from 'vue';
import CurrentWeather from './CurrentWeather.vue';
import Forecast from './Forecast.vue';
import { useWeatherStore } from '@/stores/weather';
const store = useWeatherStore();

const props = defineProps({
  city: String
});
</script>

<template>
  <div class="max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto">
    <div class="flex flex-col overflow-hidden bg-white rounded-lg shadow-lg">
      <CurrentWeather :city="props.city" :key="`current-${store?.isCelsius}`" />
      <Forecast :city="props.city" :key="`forecast-${store?.isCelsius}`" />
    </div>
  </div>
</template>
