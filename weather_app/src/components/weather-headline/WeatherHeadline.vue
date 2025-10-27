<template>
<div class="weather-headline">
  <div class="weather-temperatures"> <!-- Temperatures -->
    <p class="current-temperature">
      {{ props.model.currentTemperature }}
    </p>
    <p class="feels-like-temperature">
      feels like {{ props.model.feelsLikeTemperature }}
    </p>
  </div>

  <img class="condition-icon" :src="props.model.conditionIconUrl" alt="Condition icon" /> <!-- Condition icon -->
</div>
</template>

<script setup lang="ts">
import type WeatherHeadlineModel from './WeatherHeadlineModel';

const props = defineProps<{
  model: WeatherHeadlineModel
}>();
</script>

<style scoped>
p {
  margin: 0;
  &::after {
    content: "°C";
  }
}

.weather-headline {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.weather-temperatures {
  display: inherit;
  flex-direction: inherit;

  gap: .25rem;

  align-items: end;
}

.current-temperature {
  font-size: 3rem;
  font-weight: 600;
}

.feels-like-temperature {
  font-size: 1rem;
  font-weight: 400;

  margin-bottom: 0.8rem;
}

.condition-icon {
  /* width: 2rem; */
  height: 4rem;

  align-self: center;
}
</style>
