<script setup>
import { useFetch } from '@/composables/fetch';
import { computed, ref, watch } from 'vue';
import { useCityStore } from '@/stores/cities';
import { useWeatherStore } from '@/stores/weather';

const isMenuOpen = ref(false);
const isCelsius = ref(true);
const searchQuery = ref('');
const WEATHER_API = import.meta.env.VITE_WEATHER_API;
const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;
const WEATHER_GEO = import.meta.env.VITE_WEATHER_GEO;
const store = useCityStore();
const weatherStore = useWeatherStore();
const apiUrl = computed(() => {
  if (searchQuery.value) {
    console.log(
      `${WEATHER_BASE_URL}${WEATHER_GEO}direct?q=${searchQuery.value}&limit=${5}&appid=${WEATHER_API}`
    );
    return `${WEATHER_BASE_URL}${WEATHER_GEO}direct?q=${searchQuery.value}&limit=${5}&appid=${WEATHER_API}`;
  }
  return null;
});
const { data, error, isLoading } = useFetch(apiUrl);

watch(data, (newData) => {
  if (newData) {
    store.updateCities(newData);
  }
});
console.log(store.cities.value);
const searchCity = (e) => {
  searchQuery.value = e.target.value;
};
const selectCity = (city) => {
  console.log(city);
  store.setCurrentCity(city);
  weatherStore.updateWeatherCities(searchQuery.value);
  searchQuery.value = '';
  store.updateCities([]);
};
</script>

<template>
  <nav class="bg-gradient-to-r p-4 text-gray">
    <div class="container mx-auto flex items-center justify-between lg:justify-start relative">
      <!-- Logo -->
      <span class="font-semibold text-xl tracking-tight">Logo</span>

      <!-- Hamburger Menu Icon and Close Icon for Mobile -->
      <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden">
        <span class="material-symbols-outlined">
          {{ isMenuOpen ? 'close' : 'menu' }}
        </span>
      </button>

      <!-- Desktop Menu Items -->
      <div class="hidden lg:flex lg:items-center lg:justify-between lg:flex-grow lg:px-10">
        <!-- Desktop Search Bar -->
        <input
          @input="searchCity"
          :value="searchQuery"
          class="bg-white appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary w-full max-w-md"
          type="text"
          placeholder="Search..."
        />

        <ul
          v-if="store.cities.length > 0"
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

        <!-- Celsius/Fahrenheit Switch -->
        <label for="toggleC-desktop" class="flex items-center cursor-pointer">
          <div class="relative">
            <input type="checkbox" id="toggleC-desktop" class="sr-only" v-model="isCelsius" />
            <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div
              class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
              :class="{ 'translate-x-6': !isCelsius }"
            ></div>
          </div>
          <div class="ml-3">°C / °F</div>
        </label>
      </div>

      <!-- Mobile Menu Items -->
      <div
        :class="{ 'flex flex-col items-center': isMenuOpen, hidden: !isMenuOpen }"
        class="absolute top-full left-0 right-0 bg-opacity-30 rounded bg-primary p-4 lg:hidden z-10"
      >
        <!-- Mobile Search Bar  -->
        <input
          v-model="searchQuery"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary w-full"
          type="text"
          placeholder="Search..."
        />
        <ul
          v-if="store.cities.length > 0"
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
        <!-- Celsius/Fahrenheit Switch  -->
        <label for="toggleC-mobile" class="flex items-center cursor-pointer mt-4">
          <div class="relative">
            <input type="checkbox" id="toggleC-mobile" class="sr-only" v-model="isCelsius" />
            <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div
              class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
              :class="{ 'translate-x-6': !isCelsius }"
            ></div>
          </div>
          <div class="ml-3 text-white">°C / °F</div>
        </label>
      </div>
    </div>
  </nav>
</template>
