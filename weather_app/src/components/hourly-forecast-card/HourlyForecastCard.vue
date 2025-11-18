<template>
  <q-card flat class="q-pa-md bg-purple-1 rounded-borders">
    <div class="text-subtitle1 flex items-center text-weight-medium text-purple-10  q-mb-sm">
      <ShapedIcon :icon="'access_time'" class="q-mr-sm"/>
      <p class="title">Hourly forecast</p>
    </div>

    <div class="row justify-around items-center no-wrap" style="overflow-x: auto;">
      <div
        v-for="(label, index) in time_label"
        :key="index"
        class="column items-center q-mx-sm"
        style="min-width: 64px;"
      >

            <MiniWeatherStatus
              :model="{
                date: label,
                weatherIconUrl: weather_icons[index]!,
                information: (temperatures[index] !== undefined ? temperatures[index] : '') + suffix
              }"
            />
      </div>

    </div>
  </q-card>
</template>

<script setup lang="ts">
import MiniWeatherStatus from 'components/mini-weather-status/MiniWeatherStatus.vue'
import ShapedIcon from '../shaped-icon/ShapedIcon.vue';

defineProps({
  time_label: {
    type: Array<string>,
    required: true,
  },
  weather_icons: {
    type: Array<string>,
    required: true,
    default: () => ['fa-solid fa-house'],
  },
  temperatures: {
    type: Array<number>,
    required: true,
  }
  ,
  suffix: {
    type: String,
    required: false,
    default: '°'
  }
})
</script>

<style scoped>
.rounded-borders {
  border-radius: 16px !important;
  overflow: hidden; /* ensure children don't overflow rounded corners */
}

/* tighten up Quasar card selectors to be sure styles apply */
.q-card.flat.bordered {
  border-radius: 16px !important;
}

.title {
  margin: 0;

  color:#4A4459;
}
</style>
