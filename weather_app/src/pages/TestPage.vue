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

    <mini-weather-status
      :model="{
        date: '14:00',
        information: '22°C',
        weatherIconUrl: '//cdn.weatherapi.com/weather/128x128/day/176.png'
      }"
    ></mini-weather-status>

    <shaped-icon />

    <WeatherHeadline :model="{
      currentTemperature: 20,
      feelsLikeTemperature: 18,
      conditionIconUrl: '//cdn.weatherapi.com/weather/128x128/day/176.png'
    }"/>

    <SeamlessSearchBar searchHint="Wrocław" v-model:search-model="searchValue" />
    <div><p>{{ searchValue }}</p></div>
  </q-page>
</template>

<script setup lang="ts">
import HorizontalWeatherCard from 'components/HorizontalWeatherCard/HorizontalWeatherCard.vue';
import MiniWeatherStatus from 'components/mini-weather-status/MiniWeatherStatus.vue';
import SeamlessSearchBar from 'src/components/seamless-search-bar/SeamlessSearchBar.vue';
import ShapedIcon from 'src/components/shaped-icon/ShapedIcon.vue';
import WeatherHeadline from 'src/components/weather-headline/WeatherHeadline.vue';

import { ref } from 'vue';

const searchValue = ref<string>('Kraków');
</script>
