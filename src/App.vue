<template>
  <main class="min-h-screen py-8">
    <WeatherCard city="Amsterdam" />
    <WeatherCard city="New York" />
    <WeatherCard city="Toronto" />
  </main>
</template>

<script setup>
import WeatherCard from './components/WeatherCard.vue';
</script>
