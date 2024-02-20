<script setup>
import WeatherCard from './components/WeatherCard.vue';
import Navigation from './components/Navigation.vue';
import { useWeatherStore } from './stores/weather';
import SearchBar from './components/SearchBar.vue';

const weatherStore = useWeatherStore();
</script>

<template>
  <main class="flex flex-col h-screen bg-gradient-to-r from-background to-surface">
    <Navigation />
    <div class="flex-grow overflow-auto">
      <!-- Content here -->
      <div v-if="weatherStore.weatherCities.length > 0" class="container mx-auto p-4 lg:p-8">
        <div class="flex flex-wrap -m-4 justify-center items-stretch">
          <WeatherCard v-for="city in weatherStore.weatherCities" :key="city" :city="city" />
        </div>
      </div>
      <div v-else class="flex justify-center items-center flex-grow">
        <SearchBar class="w-full max-w-md p-4" />
      </div>
    </div>
  </main>
</template>

<style>
/* If you have additional global styles, you can place them here */
</style>
