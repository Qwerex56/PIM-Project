<template>
  <header>
    <WeatherTopbox :headlineModel="headlineModel" :searchHint="searchHint" />
  </header>
  <main class="current-weather-view">
    <div class="status-top">
      <StatusCard
        title="Wilgotność"
        :value="weatherStore.getForecast?.forecast.forecastday[1]?.hour?.[0]?.humidity?.toString() + ' %'"
        :icon="'water_drop'"
      />
      <StatusCard
        title="Wiatr"
        :value="weatherStore.getForecast?.forecast.forecastday[1]?.hour?.[0]?.wind_kph?.toString() + ' kph'"
        :icon="'air'"
      />
      <StatusCard
        title="Ciśnienie"
        :value="weatherStore.getForecast?.forecast.forecastday[1]?.hour?.[0]?.pressure_mb?.toString() + ' mb'"
        :icon="'dew_point'"
      />
      <StatusCard
        title="Widoczność"
        :value="weatherStore.getForecast?.forecast.forecastday[1]?.hour?.[0]?.vis_km?.toString() + ' km'"
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
        :value="weatherStore.getForecast?.forecast.forecastday[1]?.astro.sunrise.toString() + ''"
        :icon="'sunny'"
      />
      <StatusCard
        title="Zachód słońca"
        :value="weatherStore.getForecast?.forecast.forecastday[1]?.astro.sunset.toString() + ''"
        :icon="'nightlight'"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import HourlyForecastCard from 'src/components/hourly-forecast-card/HourlyForecastCard.vue';
import StatusCard from 'src/components/status-card/StatusCard.vue';
import WeatherTopbox from 'src/components/weather-topbox/WeatherTopbox.vue';
import { useWeatherStore } from 'src/stores/weatherStore';

import { computed } from 'vue';
import type { Hour } from 'src/data/forecastWeather';
import type WeatherHeadlineModel from 'src/components/weather-headline/WeatherHeadlineModel';

const weatherStore = useWeatherStore();

const headlineModel = computed<WeatherHeadlineModel>(() => ({
  currentTemperature: weatherStore.getForecast?.forecast.forecastday?.[1]?.day?.avgtemp_c ?? 0,
  feelsLikeTemperature: weatherStore.getForecast?.forecast.forecastday?.[1]?.day?.avgtemp_c ?? 0,
  conditionIconUrl: weatherStore.getForecast?.forecast.forecastday?.[1]?.day?.condition?.icon ?? ''
}));

const searchHint = computed(() => weatherStore.getLocation ?? 'Search location');

// extract tomorrow's hourly forecast (safely) and derive arrays used by HourlyForecastCard
const hourly = computed(() => {
  return (
    weatherStore.getForecast?.forecast?.forecastday?.[1]?.hour ?? []
  );
});

const timeLabelArray = computed(() =>
  hourly.value.map((h: Hour) => {
    const t = h?.time ?? '';
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
</style>
