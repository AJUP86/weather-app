<script setup>
import { defineProps } from 'vue';
import CurrentWeather from './CurrentWeather.vue';
import Forecast from './Forecast.vue';

const props = defineProps({
  city: String
});
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <CurrentWeather :city="props.city" class="flex-grow" />
      <Forecast :city="props.city" class="flex-grow" />
    </div>
  </div>
</template>
