<template>
  <section class="horizontal-weather-card">
    <div class="weather-info">
      <p class="location">{{ props.weatherData.LocationName }}</p>
      <p class="temperature">{{ props.weatherData.TemperatureMax }}</p>
      <p class="condition">{{ props.weatherData.Condition?? $t('hWeatherCard.error.no_condition') }}</p>
      <p class="temperature">{{ props.weatherData.TemperatureMin }}</p>
    </div>

    <div class="separator"></div>

    <img class="condition-icon" :src="props.weatherData.ConditionIconUrl" alt="Con image" />
  </section>
</template>

<script setup lang="ts">
import type HorizontalWeatherCardModel from './HorizontalWeatherCardModel';

const props = defineProps<{
  weatherData: HorizontalWeatherCardModel;
}>();

</script>

<style scoped>
.horizontal-weather-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border-radius: .75rem;

  background-color: var(--primary-container);
  color: var(--on-surface);

  padding: 1rem;
}

.weather-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

  align-items: center;

  width: 100%;
}

.separator {
  width: .125rem;
  background-color: var(--on-surface);
  opacity: 0.2;

  margin: 0 1rem;
}

p {
  margin: 0;
}

.location {
  font-weight: 500;
}

.temperature {
  justify-self: end;

  font-weight: 500;
}

.temperature::after {
  content: '°C';

  margin-left: .125rem;

  font-size: .875rem;
  font-weight: 400;
}

.condition {
  font-size: .875rem;
  font-weight: 400;
}

.condition-icon {
  width: 3rem;
  height: 3rem;
}
</style>
