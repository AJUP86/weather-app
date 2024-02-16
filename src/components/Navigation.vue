<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);
const isCelsius = ref(true); // For the temperature switch state
</script>

<template>
  <nav class="bg-primary p-4 text-white">
    <div class="container mx-auto flex items-center justify-between lg:justify-start relative">
      <!-- Logo -->
      <span class="font-semibold text-xl tracking-tight">Logo</span>

      <!-- Hamburger Menu Icon and Close Icon for Mobile -->
      <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden right-4 top-3">
        <span class="material-symbols-outlined">
          {{ isMenuOpen ? 'close' : 'menu' }}
        </span>
      </button>

      <!-- Desktop Menu Items -->
      <div class="hidden lg:flex lg:items-center lg:justify-between lg:flex-grow lg:px-10">
        <!-- Desktop Search Bar -->
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary w-full max-w-md"
          type="text"
          placeholder="Search..."
        />

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
        <!-- Mobile Search Bar with Opacity -->
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary w-full"
          type="text"
          placeholder="Search..."
        />
        <!-- Celsius/Fahrenheit Switch with Opacity -->
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
