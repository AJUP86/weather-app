<template>
  <Navigation />
  <main class="min-h-screen bg-gradient-to-r py-8 flex justify-center items-center">
    <div class="flex flex-wrap justify-center gap-4">
      <WeatherCard city="Amsterdam" />
      <WeatherCard city="Lima" />
      <WeatherCard city="Tokio" />
    </div>
  </main>
</template>

<script setup>
import WeatherCard from './components/WeatherCard.vue';
import Navigation from './components/Navigation.vue';
</script>
