<template>
<main class="main-view">
  <div class="top-bar">
    <font-awesome-icon :icon="faBars" size="2x" />
    <p>Weather App</p>
    <font-awesome-icon :icon="faUser" size="2x" />
  </div>

  <section>
    <!-- Weather information -->
    <div v-if="weatherDataList.length === 0">
      <p class="no-saved-locations">No saved locations</p>
    </div>

    <div v-else>
      <HorizontalWeatherCard
        v-for="value in weatherDataList"
        :key="value.LocationName"

        :weather-data="value"

        class="weather-card"
      />
    </div>

  </section>

  <!-- Search bar -->
  <!-- Its really a button which changes page to search view -->
  <router-link class="search-button" to="/search">
    Search location
    <font-awesome-icon :icon="faMagnifyingGlass" />
  </router-link>
</main>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import HorizontalWeatherCard from 'src/components/HorizontalWeatherCard/HorizontalWeatherCard.vue';
import type HorizontalWeatherCardModel from 'src/components/HorizontalWeatherCard/HorizontalWeatherCardModel';


// example weather data list
const weatherDataList: Array<HorizontalWeatherCardModel> = [
  {
    LocationName: 'New York',
    TemperatureMax: 25,
    TemperatureMin: 15,
    Condition: 'Sunny',
    ConditionIconUrl: '//cdn.weatherapi.com/weather/128x128/day/176.png'
  },
  {
    LocationName: 'Los Angeles',
    TemperatureMax: 28,
    TemperatureMin: 18,
    Condition: 'Partly Cloudy',
    ConditionIconUrl: '//cdn.weatherapi.com/weather/128x128/day/116.png'
  },
  {
    LocationName: 'Chicago',
    TemperatureMax: 22,
    TemperatureMin: 12,
    Condition: 'Rainy',
    ConditionIconUrl: '//cdn.weatherapi.com/weather/128x128/day/308.png'
  },
]
</script>

<style scoped>
.main-view {
  display: flex;
  flex-direction: column;

  height: 100%;
}

.no-saved-locations {
  text-align: center;
  color: gray;
}

.weather-card {
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  padding: 1rem 2rem;
  margin-bottom: 1rem;

  background-color: #F3EDF7;
}

p {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

.search-button {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 1rem 1rem 2rem;
  margin: auto 1rem 1rem 1rem;

  justify-self: end;

  background-color: #F3EDF7;

  border: none;
  border-radius: 999999px;
}
</style>
