<template>
  <main class="detail-view">

      <q-card flat class="q-pa-md full-width q-mb-md summary-card">
        <div class="row justify-between items-center">
          <div>
            <div class="text-subtitle1 text-grey-8">{{ weatherData.LocationName }}</div>
            <div class="text-h2 text-bold text-dark">{{ weatherData.Temperature }}°C</div>
            <div class="text-caption text-grey-7">feels like {{ weatherData.TemperaturePerceived }}°C</div>
          </div>
          <q-avatar size="80px" >
            <!-- <q-icon name="mdi-weather-sunny" size="40px" color="amber" /> -->
             <img class="condition-icon" :src="weatherData.ConditionIconUrl" alt="Con image" />
          </q-avatar>
        </div>

          <div class="row justify-around">
            <q-btn label="Today" class="btn-today" unelevated />
            <q-btn label="Tomorrow" class="btn-tomorrow" unelevated />
            <q-btn label="3 days" class="btn-3days" unelevated />
          </div>
        <!-- </q-card> -->
      </q-card>

      <!-- this is a copypaste from mainview -->
      <section>
    <!-- Weather information -->
    <div v-if="exampleFutureWeatherData.length === 0">
      <p class="no-saved-locations">No saved locations</p>
    </div>

    <div v-else>
      <HorizontalWeatherCard
        v-for="value in exampleFutureWeatherData"
        :key="value.LocationName"

        :weather-data="value"

        class="weather-card"
      />
    </div>

  </section>
  </main>
</template>

<style scoped>
.q-page {
  min-height: 100vh;
}
.summary-card {
  background-color: #f3e5f5;
  border-radius: 12px;
}
.btn-today,
.btn-tomorrow,
.btn-3days {
  flex: 1;
  margin: 0 4px;
  border-radius: 12px;
  text-transform: none;
  font-weight: 500;
}

.btn-today {
  background-color: #f8bbd0;
  color: #212121;
}

.btn-tomorrow {
  background-color: #f8bbd0;
  color: #212121;
}
.label{
  font-weight: 600;
}
.btn-3days {
  background-color: #d1c4e9;
  color: #212121;
}

.forecast-card {
  background-color: #eadcfe;
  border-radius: 12px;
  padding: 12px 16px;
}
.single-forecast {
  margin-right: 1em;
}
.weather-card {
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}

</style>

<script setup lang="ts">
import HorizontalWeatherCard from 'src/components/HorizontalWeatherCard/HorizontalWeatherCard.vue';
import type DetailViewModel from './DetailViewModel';
import type HorizontalWeatherCardModel from 'src/components/HorizontalWeatherCard/HorizontalWeatherCardModel';

// reuses HorizontalWeatherCard due to its similarity
// uses location as day label, card should be generalised
const props = defineProps<{
  weatherData: DetailViewModel;
}>();

const exampleFutureWeatherData: Array<HorizontalWeatherCardModel> = [
  {
    LocationName: 'Monday',
    TemperatureMax: 25,
    TemperatureMin: 15,
    Condition: 'Sunny',
    ConditionIconUrl: '//cdn.weatherapi.com/weather/128x128/day/176.png'
  },
  {
    LocationName: 'Tuesday',
    TemperatureMax: 28,
    TemperatureMin: 18,
    Condition: 'Partly Cloudy',
    ConditionIconUrl: '//cdn.weatherapi.com/weather/128x128/day/116.png'
  },
  {
    LocationName: 'Wednesday',
    TemperatureMax: 22,
    TemperatureMin: 12,
    Condition: 'Rainy',
    ConditionIconUrl: '//cdn.weatherapi.com/weather/128x128/day/308.png'
  },
]

const defaultWeatherData: DetailViewModel = {
  LocationName: 'Wrocław, Poland',
  Temperature: 27,
  TemperaturePerceived: 24,
  ConditionIconUrl: '//cdn.weatherapi.com/weather/128x128/day/116.png',
  // weatherDataList: exampleFutureWeatherData
  // add other required properties with sensible defaults
};

const weatherData = props.weatherData ?? defaultWeatherData;

</script>
