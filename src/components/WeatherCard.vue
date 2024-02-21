<script setup>
import { defineProps } from 'vue';
import CurrentWeather from './CurrentWeather.vue';
import Forecast from './Forecast.vue';
import { useWeatherStore } from '@/stores/weather';

const store = useWeatherStore();
const props = defineProps({
  city: String
});

const handleDelete = () => {
  store.deleteWeatherCard(props.city);
};
</script>

<template>
  <div class="mx-auto w-full max-w-xl p-2">
    <div
      class="flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-light to-lightGray rounded-xl shadow-xl relative transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
    >
      <!-- Delete Button -->
      <button
        class="absolute top-2 right-2 z-10 p-2 text-error bg-white bg-opacity-75 rounded-full shadow-sm hover:bg-opacity-100 transition duration-200"
        @click="handleDelete"
      >
        <span class="material-symbols-outlined">close</span>
      </button>

      <!-- Current Weather -->
      <div
        class="flex flex-1 flex-col items-center justify-center p-4 lg:border-r border-lightGray"
      >
        <CurrentWeather :city="props.city" :key="`current-${store?.isCelsius}`" />
      </div>

      <!-- Forecast -->
      <div class="flex flex-3">
        <Forecast :city="props.city" :key="`forecast-${store?.isCelsius}`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.group:hover .delete-button {
  opacity: 1;
}

.mx-auto {
  max-width: 100%;
}

.flex {
  display: flex;
}

/* Add media queries for larger screens */
@media (min-width: 1024px) {
  /* Adjust the breakpoint as needed */
  .mx-auto {
    max-width: 80%; /* Or any specific size you prefer */
  }

  .weather-card {
    padding: 2rem; /* Increased padding */
    flex-direction: row; /* Ensure it's row-oriented on larger screens */
  }

  /* Optionally adjust the flex property for children if needed */
  .weather-card > div {
    flex: 1; /* Adjust the flex-basis as needed for children */
  }
}

/* Additional adjustments for larger screens */
@media (min-width: 1440px) {
  .mx-auto {
    max-width: 75%; /* Even larger on very wide screens */
  }
  /* Further customize as needed */
}
</style>
