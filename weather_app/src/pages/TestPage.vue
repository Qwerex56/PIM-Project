<template>
  <q-page class="row items-center justify-evenly">
    <horizontal-weather-card
      :weather-data="{
        LocationName: 'San Francisco',
        TemperatureMax: 22,
        TemperatureMin: 15,
        Condition: 'Sunny',
        ConditionIconUrl: '//cdn.weatherapi.com/weather/128x128/day/176.png'
      }"
    ></horizontal-weather-card>
  </q-page>
</template>

<script setup lang="ts">
import HorizontalWeatherCard from 'components/HorizontalWeatherCard/HorizontalWeatherCard.vue';
</script>
