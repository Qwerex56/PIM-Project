<template>
<div class="weather-topbox">
  <SeamlessSearchBar />

  <WeatherHeadline :model="{
    currentTemperature: 10,
    feelsLikeTemperature: 8,
    conditionIconUrl: '//cdn.weatherapi.com/weather/128x128/day/176.png'
  }"/>

  <div class="forecast-buttons">
    <router-link class="button" to="/current" v-ripple>Today</router-link>
    <router-link class="button" to="/current" v-ripple>Tomorrow</router-link>
    <router-link class="button" to="/details" v-ripple>3 days</router-link>
  </div>
</div>
</template>

<script setup lang="ts">
import SeamlessSearchBar from '../seamless-search-bar/SeamlessSearchBar.vue';
import WeatherHeadline from '../weather-headline/WeatherHeadline.vue';

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

  justify-content: space-around;
  gap: 0.5rem;
}

.button {
  display: flex;
  flex: 1;

  background-color: #FFD8E4;
  padding: 0.5rem 0;

  justify-content: center;

  border-radius: 0.5rem;

  color: #4A4459;
  text-decoration: none;
  font-weight: 600;

  cursor: pointer;
}


</style>
