<script setup>
import { computed, ref, watch } from 'vue';
import { useWeatherStore } from '@/stores/weather';
import { useCityStore } from '@/stores/cities';
import SearchBar from './SearchBar.vue';

const isCelsius = ref(true);
const weatherStore = useWeatherStore();
const cityStore = useCityStore();
const desktopStyle = 'max-w-md';
const mobileStyle = '';

const hasCities = computed(() => weatherStore.weatherCities.length > 0);
watch(isCelsius, (newUnit) => {
  weatherStore.updateUnits(newUnit);
});
</script>

<template>
  <nav class="bg-gradient-to-r p-4 text-gray">
    <div class="container mx-auto flex items-center justify-between lg:justify-start relative">
      <span class="font-semibold text-xl tracking-tight">Logo</span>

      <!-- Hamburger Menu Icon and Close Icon for Mobile -->
      <button
        @click="cityStore.isMenuOpen = !cityStore.isMenuOpen"
        class="lg:hidden z-30 hover:text-black hover:no-underline hover:bg-transparent"
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
        :class="{
          'flex flex-col items-center': cityStore.isMenuOpen,
          hidden: !cityStore.isMenuOpen
        }"
        class="fixed inset-0 bg-opacity-80 bg-white p-4 lg:hidden z-20 transition duration-300 ease-in-out flex-col items-center justify-center"
      >
        <div v-if="hasCities" class="w-full px-4 py-2 flex items-center justify-between">
          <SearchBar :style="mobileStyle" />
          <label for="toggleC-mobile" class="flex items-center cursor-pointer">
            <div class="relative">
              <input type="checkbox" id="toggleC-mobile" class="sr-only" v-model="isCelsius" />
              <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
                :class="{ 'translate-x-6': !isCelsius }"
              ></div>
            </div>
            <div class="ml-3 text-darkgrey">°C / °F</div>
          </label>
        </div>
      </div>
    </div>
  </nav>
</template>
