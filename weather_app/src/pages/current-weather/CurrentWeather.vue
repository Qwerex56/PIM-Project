<template>
  <header>
    <WeatherTopbox :headlineModel="headlineModel" :searchHint="searchHint" />
  </header>

  <main class="current-weather-view">
    <div class="status-top">
      <StatusCard
        title="Wilgotność"
        :value="weatherStore.getCurrentWeather?.current.humidity.toString() + ' %'"
        :icon="'water_drop'"
      />
      <StatusCard
        title="Wiatr"
        :value="weatherStore.getCurrentWeather?.current.wind_kph.toString() + ' kph'"
        :icon="'air'"
      />
      <StatusCard
        title="Ciśnienie"
        :value="weatherStore.getCurrentWeather?.current.pressure_mb.toString() + ' mb'"
        :icon="'dew_point'"
      />
      <StatusCard
        title="Widoczność"
        :value="weatherStore.getCurrentWeather?.current.vis_km.toString() + ' km'"
        :icon="'visibility'"
      />
    </div>

    <HourlyForecastCard
      :temperatures="chanceOfRainArray"
      :time_label="timeLabelArray"
      :weather_icons="weatherIconsArray"
      suffix="%"
    />

    <HourlyForecastCard
      :temperatures="temperatureArray"
      :time_label="timeLabelArray"
      :weather_icons="weatherIconsArray"
      suffix="°"
    />

    <div class="status-bottom">
      <StatusCard
        title="Wschód słońca"
        :value="weatherStore.getForecast?.forecast.forecastday[0]?.astro.sunrise.toString() + ''"
        :icon="'sunny'"
      />
      <StatusCard
        title="Zachód słońca"
        :value="weatherStore.getForecast?.forecast.forecastday[0]?.astro.sunset.toString() + ''"
        :icon="'nightlight'"
      />
    </div>

    <div class="actions-row">
      <button class="save-location-btn" @click="saveLocation">Zapisz lokalizację</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import HourlyForecastCard from 'src/components/hourly-forecast-card/HourlyForecastCard.vue';
import StatusCard from 'src/components/status-card/StatusCard.vue';
import WeatherTopbox from 'src/components/weather-topbox/WeatherTopbox.vue';
import { useWeatherStore } from 'src/stores/weatherStore';

import { computed } from 'vue';
import { LocalStorage, Notify } from 'quasar';
import type { Hour } from 'src/data/forecastWeather';
import type WeatherHeadlineModel from 'src/components/weather-headline/WeatherHeadlineModel';

const weatherStore = useWeatherStore();

const headlineModel = computed<WeatherHeadlineModel>(() => ({
  currentTemperature: weatherStore.getCurrentWeather?.current.temp_c ?? 0,
  feelsLikeTemperature: weatherStore.getCurrentWeather?.current.feelslike_c ?? 0,
  conditionIconUrl: weatherStore.getCurrentWeather?.current.condition?.icon ?? ''
}));

const searchHint = computed(() => weatherStore.getLocation ?? 'Search location');

// extract hourly forecast array (safely) and derive arrays used by HourlyForecastCard
const hourly = computed(() => {
  return (
    weatherStore.getForecast?.forecast?.forecastday?.[0]?.hour ?? []
  );
});

const timeLabelArray = computed(() =>
  hourly.value.map((h: Hour) => {
    const t = h?.time ?? '';
    // prefer HH:MM if available
    if (t) {
      const parts = t.split(' ');
      if (parts.length > 1 && typeof parts[1] === 'string') {
        return parts[1].slice(0, 5);
      }
    }
    return t;
  })
);

const weatherIconsArray = computed(() => hourly.value.map((h: Hour) => h?.condition?.icon ?? ''));

const temperatureArray = computed(() => hourly.value.map((h: Hour) => h?.temp_c ?? 0));

const chanceOfRainArray = computed(() =>
  hourly.value.map((h: Hour) => {
    const maybe = (h as unknown) as { chance_of_rain?: number };
    return typeof maybe.chance_of_rain === 'number' ? maybe.chance_of_rain : 0;
  })
);

function saveLocation() {
  const name = weatherStore.getLocation ?? weatherStore.getCurrentWeather?.location?.name ?? '';
  if (!name) {
    Notify.create({ type: 'negative', message: 'Brak aktywnej lokalizacji do zapisania.' });
    return;
  }

  const saved = LocalStorage.getItem('savedLocations');
  const list = Array.isArray(saved) ? [...saved] : [];

  if (list.includes(name)) {
    Notify.create({ type: 'info', message: `Lokalizacja "${name}" już jest zapisana.` });
    return;
  }

  list.push(name);
  LocalStorage.set('savedLocations', list);
  Notify.create({ type: 'positive', message: `Zapisano lokalizację: ${name}` });
}

</script>

<style scoped>
.current-weather-view {
  display: flex;
  flex-direction: column;

  gap: 1rem;
  padding: 1rem;
}

.status-top, .status-bottom {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 0.5rem;

  align-items: stretch;
  justify-items: stretch;
}

.actions-row {
  display: flex;
  justify-content: flex-end;
  padding: 0 1rem;
}

.save-location-btn {
  background-color: #6750A4;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  cursor: pointer;
}

.save-location-btn:active {
  transform: translateY(1px);
}
</style>
