<template>
  <q-card flat bordered class="q-pa-md bg-purple-1 rounded-borders">
    <div class="text-subtitle1 text-weight-medium text-purple-10 flex items-center q-mb-sm">
      <!-- <q-icon name="access_time" class="q-mr-sm" /> -->
       <!-- <ShapedIcon icon="fa-regular fa-clock" class="q-mr-sm"/> -->
       <q-icon name="fa-regular fa-clock" class="q-mr-sm"/>
      Hourly forecast
    </div>

    <div class="row justify-around items-center no-wrap" style="overflow-x: auto;">
      <div
        v-for="(label, index) in time_label"
        :key="index"
        class="column items-center q-mx-sm"
        style="min-width: 64px;"
      >
        <!-- <div class="text-caption text-grey-9 q-mb-xs">{{ label }}</div> -->

        <MiniWeatherStatus
          :model="{
            date: label,
            weatherIconUrl: weather_icons[index]!,
            information: temperatures[index] + '°'
          }"
        />
      </div>

    </div>
  </q-card>
</template>

<script setup lang="ts">
import MiniWeatherStatus from 'components/mini-weather-status/MiniWeatherStatus.vue'
import ShapedIcon from '../shaped-icon/ShapedIcon.vue';

const props = defineProps({
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
</style>
