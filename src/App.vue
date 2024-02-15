<template>
  <main class="min-h-screen bg-gradient-to-r py-8 flex justify-center items-center">
    <div class="flex flex-wrap justify-center gap-4">
      <WeatherCard city="Amsterdam" />
      <WeatherCard city="Managua" />
      <WeatherCard city="Tokio" />
      <!-- Add more cards as needed -->
    </div>
  </main>
</template>

<script setup>
import WeatherCard from './components/WeatherCard.vue';
</script>
