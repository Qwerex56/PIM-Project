<template>
<div class="mini-weather-status">
  <p class="date-time">{{ props.model.date }}</p>
  <img class="condition-icon" :src="props.model.weatherIconUrl" alt="weather-condition-icon" />
  <p class="weather-info">{{ props.model.information }}</p>
</div>
</template>

<script setup lang="ts">
import type MiniWeatherStatusModel from './MiniWeatherStatusModel';

const props = defineProps<{
  model: MiniWeatherStatusModel
}>();
</script>

<style scoped>
.mini-weather-status {
  display: flex;
  flex-direction: column;

  gap: .375rem;
}

.date-time, .weather-info {
  margin: 0;

  text-align: center;

  font-weight: 500;
}

.weather-info {
  font-size: .875rem;
}

.condition-icon {
  width: 3rem;
  height: auto;
  align-self: center;
}
</style>
