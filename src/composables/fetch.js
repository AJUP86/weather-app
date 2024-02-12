// fetch.js
import { ref, watchEffect, toValue } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(false);

  const fetchData = async () => {
    isLoading.value = true;
    data.value = null;
    error.value = null;

    try {
      console.log(url);
      const response = await fetch(toValue(url));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
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
