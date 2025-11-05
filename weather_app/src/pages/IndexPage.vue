<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>

    <!-- <mini-weather-status
      :model="{
        date: 'Now',
        weatherIconUrl: 'https://cdn.weatherapi.com/weather/64x64/day/116.png',
        information: '22°C, Partly cloudy',
      }"
    ></mini-weather-status> -->
    <mini-weather-status
      :model="{
        date: 'Now',
        weatherIconUrl: 'fa-solid fa-sun',
        information: '12°C',
      }"
    ></mini-weather-status>

    <HourlyForecastCard
      :time_label="['Now', '13:00', '14:00', '15:00', '16:00', '17:00']"
      :weather_icons="[
        'fa-solid fa-sun',
        'fa-solid fa-sun',
        'fa-solid fa-sun',
        'fa-solid fa-sun',
        'fa-solid fa-sun',
        'fa-solid fa-sun'
      ]"
      :temperatures="[12, 13, 13, 11, 10, 9]"
    />
  </q-page>
  <ShapedIcon icon="fa-solid fa-house"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import MiniWeatherStatus from 'components/mini-weather-status/MiniWeatherStatus.vue';
import HourlyForecastCard from 'components/hourly-forecast-card/HourlyForecastCard.vue';
import ShapedIcon from 'src/components/shaped-icon/ShapedIcon.vue';

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);

const meta = ref<Meta>({
  totalCount: 1200,
});
</script>
