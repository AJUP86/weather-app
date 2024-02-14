<script setup>
import CurrentWeather from './CurrentWeather.vue';
import Forecast from './Forecast.vue';
</script>
<template>
  <div class="container mx-auto p-4">
    <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <CurrentWeather class="flex-grow" />
      <Forecast class="flex-grow" />
    </div>
  </div>
</template>
