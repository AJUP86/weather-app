<script setup>
import WeatherCard from './components/WeatherCard.vue';
import Navigation from './components/Navigation.vue';
import { useWeatherStore } from './stores/weather';
const weatherStore = useWeatherStore();
console.log(weatherStore.weatherCities);
const cityList = weatherStore.weatherCities;
</script>

<template>
  <Navigation />
  <main class="min-h-screen bg-gradient-to-r py-8 flex justify-center items-center">
    <div v-if="cityList.length > 0" class="flex flex-wrap justify-center gap-4">
      <WeatherCard v-for="(city, index) in cityList" :key="index" :city="city" />
    </div>
  </main>
</template>
