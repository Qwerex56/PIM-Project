<template>
<div class="weather-topbox">
  <SeamlessSearchBar />

  <WeatherHeadline :model="{
    currentTemperature: 10,
    feelsLikeTemperature: 8,
    conditionIconUrl: '//cdn.weatherapi.com/weather/128x128/day/176.png'
  }"/>

  <div class="forecast-buttons">
    <router-link class="button" to="/" v-ripple>Today</router-link>
    <router-link class="button" to="/" v-ripple>Tomorrow</router-link>
    <router-link class="button" to="/" v-ripple>3 days</router-link>
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

  justify-content: space-between;
}

.button {
  padding: 1rem 4.5rem;

  background-color: #FFD8E4;

  text-align: center;

  cursor: pointer;
}


</style>
