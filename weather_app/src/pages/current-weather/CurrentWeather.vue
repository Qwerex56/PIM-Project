<template>
  <header>
    <WeatherTopbox />
  </header>
  <main class="current-weather-view">
    <div class="status-top">
      <StatusCard />
      <StatusCard />
      <StatusCard />
      <StatusCard />
    </div>

    <HourlyForecastCard :temperatures="[10, 12, 13, 14, 15]" :time_label="['10:00', '11', '12', '13', '14']" :weather_icons="['//cdn.weatherapi.com/weather/128x128/day/176.png', '//cdn.weatherapi.com/weather/128x128/day/176.png', '//cdn.weatherapi.com/weather/128x128/day/176.png','//cdn.weatherapi.com/weather/128x128/day/176.png', '//cdn.weatherapi.com/weather/128x128/day/176.png']"/>
    <HourlyForecastCard :temperatures="[10, 12, 13, 14, 15]" :time_label="['10', '11', '12', '13', '14']" :weather_icons="['//cdn.weatherapi.com/weather/128x128/day/176.png', '//cdn.weatherapi.com/weather/128x128/day/176.png', '//cdn.weatherapi.com/weather/128x128/day/176.png','//cdn.weatherapi.com/weather/128x128/day/176.png', '//cdn.weatherapi.com/weather/128x128/day/176.png']"/>

    <div class="status-bottom">
      <StatusCard />
      <StatusCard />
    </div>
  </main>
</template>

<script setup lang="ts">
import HourlyForecastCard from 'src/components/hourly-forecast-card/HourlyForecastCard.vue';
import StatusCard from 'src/components/status-card/StatusCard.vue';
import WeatherTopbox from 'src/components/weather-topbox/WeatherTopbox.vue';


</script>

<style scoped>
.current-weather-view {
  display: flex;
  flex-direction: column;

  gap: 1rem;
  padding: 1rem;
}

.status-top, .status-bottom {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 0.5rem;

  align-items: stretch;
  justify-items: stretch;
}
</style>
