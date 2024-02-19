<script setup>
import WeatherCard from './components/WeatherCard.vue';
import Navigation from './components/Navigation.vue';
import { useWeatherStore } from './stores/weather';
import SearchBar from './components/SearchBar.vue';
const weatherStore = useWeatherStore();
</script>

<template>
  <main class="flex flex-col h-screen bg-gradient-primary">
    <Navigation />
    <div class="flex-grow overflow-auto">
      <!-- Content here -->
      <div v-if="weatherStore.weatherCities.length > 0" class="container mx-auto px-4 lg:px-8">
        <div class="flex flex-wrap -mx-4 justify-center">
          <WeatherCard v-for="city in weatherStore.weatherCities" :key="city" :city="city" />
        </div>
      </div>
      <div v-else class="flex justify-center">
        <SearchBar class="max-w-md" />
      </div>
    </div>
  </main>
</template>
