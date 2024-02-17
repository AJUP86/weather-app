// fetch.js
import { ref, watchEffect, toValue } from 'vue';

/**
 * Custom composable function to fetch data from a given URL and handle loading and error states.
 * @param {ComputedRef<string>} url - A Vue computed ref that contains the URL to fetch data from.
 * @returns {object} An object containing the data, error, and isLoading state.
 */

export function useFetch(url) {
  console.log(url.value);
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(false);

  /**
   * Fetches data from the `url` provided to the outer function and updates the data, error, and isLoading states.
   * It's designed to be used as a closure within the `watchEffect` hook.
   */
  const fetchData = async () => {
    isLoading.value = true;
    data.value = null;
    error.value = null;

    try {
      const response = await fetch(toValue(url));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      data.value = json;
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  watchEffect(() => {
    fetchData();
  });

  return { data, error, isLoading };
}
