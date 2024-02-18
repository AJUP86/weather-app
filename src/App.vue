<script setup>
import WeatherCard from './components/WeatherCard.vue';
import Navigation from './components/Navigation.vue';
import { useWeatherStore } from './stores/weather';
import { useCityStore } from './stores/cities';
import SearchBar from './components/SearchBar.vue';
const weatherStore = useWeatherStore();
const desktopView = 'max-w-md';
</script>

<template>
  <Navigation />
  <main
    class="min-h-screen bg-gradient-to-r from-background to-light py-8 flex justify-center items-center"
  >
    <div v-if="weatherStore.weatherCities.length > 0" class="flex flex-wrap justify-center gap-4">
      <WeatherCard v-for="city in weatherStore.weatherCities" :key="city" :city="city" />
    </div>
    <!-- Centered SearchBar if there are no cities -->
    <div v-else class="w-full flex justify-center">
      <SearchBar class="w-full max-w-md" :style="desktopView" />
    </div>
  </main>
</template>
