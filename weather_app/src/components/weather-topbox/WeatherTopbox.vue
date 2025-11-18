<template>
  <div class="weather-topbox">
    <SeamlessSearchBar :search-hint="searchHint" />

    <WeatherHeadline :model="headlineModelToUse" />

    <div class="forecast-buttons">
      <router-link class="button" to="/currentWeather" v-ripple>Today</router-link>
      <router-link class="button" to="/tomorrowWeather" v-ripple>Tomorrow</router-link>
      <router-link class="button" to="/weatherForecast" v-ripple>3 days</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import SeamlessSearchBar from '../seamless-search-bar/SeamlessSearchBar.vue';
import WeatherHeadline from '../weather-headline/WeatherHeadline.vue';
import type WeatherHeadlineModel from '../weather-headline/WeatherHeadlineModel';

import { computed } from 'vue';

const props = defineProps<{
  headlineModel?: WeatherHeadlineModel,
  searchHint?: string
}>();

const defaultHeadline: WeatherHeadlineModel = {
  currentTemperature: 0,
  feelsLikeTemperature: 0,
  conditionIconUrl: ''
};

const headlineModelToUse = computed(() => props.headlineModel ?? defaultHeadline);
const searchHint = computed(() => props.searchHint ?? '');

</script>


<style scoped>
.weather-topbox {
  display: flex;
  flex-direction: column;

  gap: 1.2813rem;
  padding: 1rem;

  background-color: #EADDFF;
}

.forecast-buttons {
  display: flex;
  flex-direction: row;

  justify-content: space-between;
}

.button {
  padding: 1rem 4.5rem;

  background-color: #FFD8E4;

  text-align: center;

  cursor: pointer;
}


</style>
