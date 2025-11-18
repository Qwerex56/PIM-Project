<template>
  <main class="detail-view">

    <WeatherTopBox :headline-model="headlineModel" :search-hint="searchHint" />

    <!-- 3-day forecast list -->
    <section>
      <!-- Weather information -->
      <div v-if="futureWeatherData.length === 0">
        <p class="no-saved-locations">No forecast available</p>
      </div>

      <div v-else>
        <HorizontalWeatherCard
          v-for="value in futureWeatherData"
          :key="value.LocationName"

          :weather-data="value"

          class="weather-card"
        />
      </div>

    </section>
  </main>
</template>

<style scoped>
.detail-view {
  display: flex;
  flex-direction: column;

  gap: 1rem;
}

.q-page {
  min-height: 100vh;
}
.summary-card {
  background-color: #f3e5f5;
  border-radius: 12px;
}
.btn-today,
.btn-tomorrow,
.btn-3days {
  flex: 1;
  margin: 0 4px;
  border-radius: 12px;
  text-transform: none;
  font-weight: 500;
}

.btn-today {
  background-color: #f8bbd0;
  color: #212121;
}

.btn-tomorrow {
  background-color: #f8bbd0;
  color: #212121;
}
.label{
  font-weight: 600;
}
.btn-3days {
  background-color: #d1c4e9;
  color: #212121;
}

.forecast-card {
  background-color: #eadcfe;
  border-radius: 12px;
  padding: 12px 16px;
}
.single-forecast {
  margin-right: 1em;
}
.weather-card {
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

</style>

<script setup lang="ts">
import HorizontalWeatherCard from 'src/components/HorizontalWeatherCard/HorizontalWeatherCard.vue';
import WeatherTopBox from 'src/components/weather-topbox/WeatherTopbox.vue';
import type HorizontalWeatherCardModel from 'src/components/HorizontalWeatherCard/HorizontalWeatherCardModel';
import { useWeatherStore } from 'src/stores/weatherStore';
import { computed } from 'vue';
import type { ForecastDay } from 'src/data/forecastWeather';

const weatherStore = useWeatherStore();

// Helper: convert 'YYYY-MM-DD' to weekday name (local)
function weekdayFromDate(dateStr: string) {
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString(undefined, { weekday: 'long' });
  } catch {
    return dateStr;
  }
}

const futureWeatherData = computed<Array<HorizontalWeatherCardModel>>(() => {
  const days: ForecastDay[] = weatherStore.getForecast?.forecast?.forecastday ?? [];
  return days.slice(0, 3).map((d) => ({
    LocationName: weekdayFromDate(d.date),
    TemperatureMax: d.day?.maxtemp_c ?? 0,
    TemperatureMin: d.day?.mintemp_c ?? 0,
    Condition: d.day?.condition?.text ?? undefined,
    ConditionIconUrl: d.day?.condition?.icon ?? undefined,
  }));
});

const headlineModel = computed(() => ({
  currentTemperature: weatherStore.getForecast?.forecast?.forecastday?.[0]?.day?.avgtemp_c ?? 0,
  feelsLikeTemperature: weatherStore.getForecast?.forecast?.forecastday?.[0]?.day?.avgtemp_c ?? 0,
  conditionIconUrl: weatherStore.getForecast?.forecast?.forecastday?.[0]?.day?.condition?.icon ?? '',
}));

const searchHint = computed(() => weatherStore.getLocation ?? 'Search for a location');
</script>
