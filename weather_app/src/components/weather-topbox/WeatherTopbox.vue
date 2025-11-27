<template>
  <div class="weather-topbox">
    <div class="top-bar">
      <q-icon :name="'home'" size="3rem" v-on:click="$router.push('/')"></q-icon>

        <p v-on:click="$router.push('/search')">
          {{ searchHint }}
        </p>

        <q-icon name="search" size="2rem" v-on:click="$router.push('/search')"></q-icon>
    </div>

    <WeatherHeadline :model="headlineModelToUse" />

    <div class="forecast-buttons">
      <router-link class="button" to="/currentWeather" v-ripple>Today</router-link>
      <router-link class="button" to="/tomorrowWeather" v-ripple>Tomorrow</router-link>
      <router-link class="button" to="/weatherForecast" v-ripple>3 days</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import WeatherHeadline from '../weather-headline/WeatherHeadline.vue';
import type WeatherHeadlineModel from '../weather-headline/WeatherHeadlineModel';

import { computed } from 'vue';

const $router = useRouter();

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

.top-bar {
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  gap: 1rem;

  text-align: center;

  font-size: large;
  font-weight: bold;
}

.forecast-buttons {
  display: flex;
  flex-direction: row;

  justify-content: space-between;
}

p {
  margin: none;
}

.button {
  padding: 0.5rem 1rem;

  background-color: #FFD8E4;
  color: #000000;

  text-align: center;

  cursor: pointer;

  border-radius: 999px;

  text-decoration: none;
}
</style>
