<template>
<main class="main-view">
  <div class="top-bar">
    <!-- Top bar -->
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

  <section>
    <!-- Search bar -->
  </section>
</main>
</template>

<script lang="ts" setup>
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
</style>
