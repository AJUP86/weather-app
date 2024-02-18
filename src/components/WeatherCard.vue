<script setup>
import { defineProps } from 'vue';
import CurrentWeather from './CurrentWeather.vue';
import Forecast from './Forecast.vue';
import { useWeatherStore } from '@/stores/weather';
const store = useWeatherStore();

const props = defineProps({
  city: String
});
const handleDelete = () => {
  store.deleteWeatherCard(props.city);
  console.log(props.city);
};
</script>

<template>
  <div class="max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto">
    <div class="group flex flex-col overflow-hidden bg-white rounded-lg shadow-lg relative">
      <button
        class="absolute top-2 right-2 text-black opacity-0 group-hover:opacity-100 hover:text-black hover:no-underline hover:bg-transparent"
        @click="handleDelete"
      >
        <span class="material-symbols-outlined">Delete</span>
      </button>
      <CurrentWeather :city="props.city" :key="`current-${store?.isCelsius}`" />
      <Forecast :city="props.city" :key="`forecast-${store?.isCelsius}`" />
    </div>
  </div>
</template>
