<script setup>
import WeatherCard from './components/WeatherCard.vue';
import Navigation from './components/Navigation.vue';
import { useWeatherStore } from './stores/weather';
const weatherStore = useWeatherStore();
</script>

<template>
  <Navigation />
  <main class="min-h-screen bg-gradient-to-r py-8 flex justify-center items-center">
    <div v-if="weatherStore?.weatherCities.length > 0" class="flex flex-wrap justify-center gap-4">
      <WeatherCard v-for="city in weatherStore?.weatherCities" :key="city" :city="city" />
    </div>
    <div v-else>No cities to display.</div>
  </main>
</template>
