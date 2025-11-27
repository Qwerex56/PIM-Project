<template>
  <main class="main-view">
    <div class="top-bar">
      <p>Aplikacja Pogodowa</p>
    </div>

    <section>
      <!-- Weather information -->
      <div v-if="weatherDataList.length === 0">
        <p class="no-saved-locations">Brak zapisanych lokalizacji</p>
      </div>

      <div v-else>
        <HorizontalWeatherCard v-for="value in weatherDataList" :key="value.LocationName" :weather-data="value"
          class="weather-card" v-on:click="() => {
            gotoSelectedLocation(value.LocationName);
          }" />
      </div>

    </section>

    <!-- Search bar -->
    <!-- Its really a button which changes page to search view -->
    <router-link class="search-button" to="/search">
      Wyszukaj miejscowość
      <font-awesome-icon :icon="faMagnifyingGlass" />
    </router-link>
  </main>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Notify, LocalStorage } from 'quasar'
import { useQuasar } from 'quasar';

import HorizontalWeatherCard from 'src/components/HorizontalWeatherCard/HorizontalWeatherCard.vue';
import type HorizontalWeatherCardModel from 'src/components/HorizontalWeatherCard/HorizontalWeatherCardModel';
import { useWeatherStore } from 'src/stores/weatherStore';

import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import UriString from 'src/data/uriStrings/UriString';

const $router = useRouter();
const $q = useQuasar();

const weatherStore = useWeatherStore();

const gotoSelectedLocation = async (locationName: string) => {
  weatherStore.setLocation(locationName);
  try {
    await weatherStore.fetchWeatherData();
    await weatherStore.fetchForecastData();
  } catch (e) {
    Notify.create({
      type: 'negative',
      message: 'Failed to fetch weather data for the selected location.'
    });

    $q.notify({
      type: 'negative',
      message: 'Failed to fetch weather data for the selected location.'
    });

    console.error(e);
    return;
  }

  await $router.push('/currentWeather');
}

const weatherDataList = ref<Array<HorizontalWeatherCardModel>>([]);

const apiUrl = import.meta.env.VITE_WEATHER_API_URL as string;
const apiKey = import.meta.env.VITE_WEATHER_API_KEY as string;

async function fetchForecastForLocation(locationName: string) {
  const apiUri = new UriString(apiUrl + '/forecast.json');
  apiUri.AddParameter('key', apiKey);
  apiUri.AddParameter('q', locationName);
  apiUri.AddParameter('days', '1');
  apiUri.AddParameter('aqi', 'no');
  apiUri.AddParameter('lang', 'pl');

  try {
    const response = await fetch(apiUri.GetUri());
    const data = await response.json();

    const day = data?.forecast?.forecastday?.[0]?.day;
    const loc = data?.location;

    const model: HorizontalWeatherCardModel = {
      LocationName: loc?.name ?? locationName,
      TemperatureMax: day?.maxtemp_c ?? Math.round(data?.current?.temp_c ?? 0),
      TemperatureMin: day?.mintemp_c ?? Math.round(data?.current?.temp_c ?? 0),
      Condition: day?.condition?.text ?? data?.current?.condition?.text ?? undefined,
      ConditionIconUrl: day?.condition?.icon ?? data?.current?.condition?.icon ?? undefined,
    };

    weatherDataList.value.push(model);
  } catch (err) {
    console.error('Failed to fetch forecast for', locationName, err);
    Notify.create({ type: 'negative', message: `Failed to fetch forecast for ${locationName}` });
  }
}

onMounted(() => {
  const saved = LocalStorage.getItem('savedLocations');
  if (Array.isArray(saved) && saved.length > 0) {
    // fetch for each saved location (don't block UI)
    saved.forEach((loc) => void fetchForecastForLocation(loc));
  }
});
</script>

<style scoped>
.main-view {
  display: flex;
  flex-direction: column;

  height: 100%;
}

.no-saved-locations {
  text-align: center;
  color: gray;
}

.weather-card {
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  padding: 1rem 2rem;
  margin-bottom: 1rem;

  background-color: #F3EDF7;
}

p {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

.search-button {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 1rem 1rem 2rem;
  margin: auto 1rem 1rem 1rem;

  justify-self: end;

  background-color: #F3EDF7;

  border: none;
  border-radius: 999999px;
}
</style>
