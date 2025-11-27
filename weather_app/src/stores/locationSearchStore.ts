import { defineStore, acceptHMRUpdate } from 'pinia';
import type CurrentWeather from 'src/data/currentWeather';
import UriString from 'src/data/uriStrings/UriString';

type Location = CurrentWeather['location'];

export const useLocationStore = defineStore('locationStore', {
  state: () => ({
    responseLocations: null as Location[] | null,
    isLoading: false,
    input: '' as string,
  }),

  getters: {
    getResponseLocations: (state) => state.responseLocations,
    getIsLoading: (state) => state.isLoading,
    getInput: (state) => state.input,
  },

  actions: {
    async fetchLocations() {
      this.isLoading = true;

      const apiUrl = process.env.VITE_WEATHER_API_URL as string; //import.meta.env.VITE_WEATHER_API_URL as string;
      const apiKey = process.env.VITE_WEATHER_API_KEY as string; //import.meta.env.VITE_WEATHER_API_KEY as string;

      const apiUri = new UriString(apiUrl + '/search.json');

      apiUri.AddParameter('key', apiKey);
      apiUri.AddParameter('q', this.input);
      apiUri.AddParameter('aqi', 'no');
      apiUri.AddParameter('lang', 'pl');

      try {
        const response = await fetch(apiUri.GetUri()); // Add parameters
        const data = await response.json();

        this.responseLocations = data as Location[];
        console.log(this.responseLocations);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocationStore, import.meta.hot));
}
