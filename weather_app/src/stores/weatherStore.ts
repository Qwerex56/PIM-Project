import { defineStore, acceptHMRUpdate } from 'pinia';
import type CurrentWeather from 'src/data/currentWeather';
import type { ForecastWeatherResponse } from 'src/data/forecastWeather';
import UriString from 'src/data/uriStrings/UriString';

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    location: '' as string,
    isLoading: false,
    weatherData: null as CurrentWeather | null,
    forecastData: null as ForecastWeatherResponse | null,
  }),

  getters: {
    getCurrentWeather: (state) => {
      if (state.location === '' || state.location === null) {
        return null;
      }

      return state.weatherData;
    },
    getForecast: (state) => state.forecastData,
    getIsLoading: (state) => state.isLoading,
    getLocation: (state) => state.location,
  },

  actions: {
    setLocation(locationName: string) {
      locationName = locationName.trim();

      if (!locationName || locationName === '') {
        return;
      }

      this.location = locationName;
    },
    async fetchWeatherData() {
      this.isLoading = true;

      const apiUrl = process.env.VITE_WEATHER_API_URL as string; //import.meta.env.VITE_WEATHER_API_URL as string;
      const apiKey = process.env.VITE_WEATHER_API_KEY as string; //import.meta.env.VITE_WEATHER_API_KEY as string;

      const apiUri = new UriString(apiUrl + '/current.json');

      apiUri.AddParameter('key', apiKey);
      apiUri.AddParameter('q', this.location);
      apiUri.AddParameter('aqi', 'no');
      apiUri.AddParameter('lang', 'pl');

      try {
        const response = await fetch(apiUri.GetUri()); // Add parameters
        const data = await response.json();

        this.weatherData = data as CurrentWeather;
        console.log(this.weatherData);
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * Fetch forecast data from the API and store it in `forecastData`.
     * @param days number of forecast days to request (default 7)
     * @param includeAirQuality include air quality data (default false)
     */
    async fetchForecastData(days = 7, includeAirQuality = false) {
      this.isLoading = true;

      const apiUrl = import.meta.env.VITE_WEATHER_API_URL as string;
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY as string;

      const apiUri = new UriString(apiUrl + '/forecast.json');

      apiUri.AddParameter('key', apiKey);
      apiUri.AddParameter('q', this.location);
      apiUri.AddParameter('days', String(days));
      apiUri.AddParameter('aqi', includeAirQuality ? 'yes' : 'no');
      apiUri.AddParameter('lang', 'pl');

      try {
        const response = await fetch(apiUri.GetUri());
        const data = await response.json();

        this.forecastData = data as ForecastWeatherResponse;
        console.log('forecastData', this.forecastData);
      } catch (err) {
        // keep failure silent here; you may want to surface errors to UI
        console.error('Failed to fetch forecast data', err);
        this.forecastData = null;
      } finally {
        this.isLoading = false;
      }
    },
   },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWeatherStore, import.meta.hot));
}
