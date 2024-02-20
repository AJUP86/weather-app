<script setup>
import { computed, ref } from 'vue';
import { useWeatherStore } from '@/stores/weather';
import { useCityStore } from '@/stores/cities';
import SearchBar from './SearchBar.vue';

const isCelsius = ref(true);
const weatherStore = useWeatherStore();
const cityStore = useCityStore();
const desktopStyle = 'max-w-md';
const mobileStyle = '';

const hasCities = computed(() => weatherStore.weatherCities.length > 0);

const toggleMenu = () => {
  cityStore.isMenuOpen = !cityStore.isMenuOpen;
};
const toggleTemperatureUnit = () => {
  weatherStore.isCelsius = !weatherStore.isCelsius;
};
</script>

<template>
  <nav class="bg-primary-gradient p-4 text-onPrimary">
    <div class="container mx-auto flex items-center justify-between lg:justify-start relative">
      <span class="font-semibold text-2xl tracking-tight">Weather App</span>

      <!-- Hamburger Menu Icon and Close Icon for Mobile -->
      <button
        @click="toggleMenu"
        class="lg:hidden z-30 text-onPrimary hover:text-accent hover:no-underline hover:bg-transparent"
      >
        <span class="material-symbols-outlined">
          {{ cityStore.isMenuOpen ? 'close' : 'menu' }}
        </span>
      </button>

      <!-- Desktop Menu Items -->
      <div class="hidden lg:flex lg:items-center lg:justify-between lg:flex-grow lg:px-10">
        <SearchBar v-if="hasCities" :style="desktopStyle" />
        <label for="toggleC-desktop" class="flex items-center cursor-pointer">
          <div class="relative">
            <input
              type="checkbox"
              id="toggleC-desktop"
              class="sr-only"
              :checked="weatherStore.isCelsius"
              @change="toggleTemperatureUnit"
            />
            <div class="block bg-secondary w-14 h-8 rounded-full"></div>
            <div
              class="dot absolute left-1 top-1 bg-onSecondary w-6 h-6 rounded-full transition-transform"
              :class="{ 'translate-x-6': !weatherStore.isCelsius }"
            ></div>
          </div>
          <div class="ml-3 text-onPrimary">°C / °F</div>
        </label>
      </div>
      <!-- Mobile Menu Items -->
      <div
        :class="{
          'flex flex-col items-center': cityStore.isMenuOpen,
          hidden: !cityStore.isMenuOpen
        }"
        class="fixed inset-0 bg-opacity-80 bg-surface p-4 lg:hidden z-20 transition duration-300 ease-in-out flex-col items-center justify-center"
      >
        <div v-if="hasCities" class="w-full px-4 py-2 flex items-center justify-between">
          <SearchBar :style="mobileStyle" />
          <label for="toggleC-desktop" class="flex items-center cursor-pointer">
            <div class="relative">
              <input
                type="checkbox"
                id="toggleC-desktop"
                class="sr-only"
                :checked="weatherStore.isCelsius"
                @change="toggleTemperatureUnit"
              />
              <div class="block bg-secondary w-14 h-8 rounded-full"></div>
              <div
                class="dot absolute left-1 top-1 bg-onSecondary w-6 h-6 rounded-full transition-transform"
                :class="{ 'translate-x-6': !weatherStore.isCelsius }"
              ></div>
            </div>
            <div class="ml-3 text-onBackground">°C / °F</div>
          </label>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  background-image: linear-gradient(to right, var(--color-primary) 0%, var(--color-secondary) 100%);
}

/* Add any additional styling here */
/* Ensure that the gradient is smooth and the text is legible */
</style>
