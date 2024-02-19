<script setup>
import { computed, ref, watch } from 'vue';
import { useCityStore } from '@/stores/cities';
import { useWeatherStore } from '@/stores/weather';
import { useFetch } from '@/composables/fetch';

const searchQuery = ref('');
const errorMessage = ref('');
const store = useCityStore();
const weatherStore = useWeatherStore();
const WEATHER_API = import.meta.env.VITE_WEATHER_API;
const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
const WEATHER_GEO = import.meta.env.VITE_WEATHER_GEO;

const props = defineProps({
  style: String
});

const apiUrl = computed(() => {
  if (searchQuery.value) {
    return `${WEATHER_BASE_URL}${WEATHER_GEO}direct?q=${searchQuery.value}&limit=${5}&appid=${WEATHER_API}`;
  }
  return null;
});
const cityAlreadyAdded = computed(() => {
  return weatherStore.weatherCities.includes(searchQuery.value.toLowerCase());
});

const { data } = useFetch(apiUrl);

watch(data, (newData) => {
  if (newData) {
    store.updateCities(newData);
  }
});
const searchCity = (e) => {
  searchQuery.value = e.target.value;
};

const selectCity = (city) => {
  if (!cityAlreadyAdded.value) {
    store.setCurrentCity(city);
    weatherStore.updateWeatherCities(searchQuery.value);
    searchQuery.value = '';
    store.updateCities([]);
    store.isMenuOpen = !store.isMenuOpen;
  } else {
    errorMessage.value = 'This city is already added.';
  }
};

watch(searchQuery, () => {
  errorMessage.value = '';
});
</script>

<template>
  <div class="relative w-3/4">
    <input
      @input="searchCity"
      :value="searchQuery"
      class="bg-white appearance-none border-2 border-gray-600 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary w-full"
      :class="props.style"
      type="text"
      placeholder="Search city..."
    />
    <p v-if="errorMessage" class="text-error text-sm mt-2">{{ errorMessage }}</p>
    <ul
      v-if="store.cities.length > 0 && searchQuery != '' && !errorMessage"
      class="absolute top-full left-0 mt-1 w-full bg-white rounded shadow-lg z-10"
    >
      <li
        v-for="city in store.cities"
        :key="city.lat"
        @click="selectCity(city.name)"
        class="px-4 py-2 hover:bg-gray-100"
      >
        <p>{{ city.name }}, {{ city.country }}, {{ city.state }}.</p>
      </li>
    </ul>
  </div>
</template>
