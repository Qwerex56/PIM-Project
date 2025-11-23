<template>
  <main class="main-view">
    <div class="top-bar">
      <font-awesome-icon :icon="faBars" size="2x" />
      <p>Weather App</p>
      <font-awesome-icon :icon="faUser" size="2x" />
    </div>

    <section>
      <q-card column flat bordered class="current-location-card">
        <q-item clickable @click="getCurrentPositionAndTriggerReload">
          <q-item-section avatar>
            <q-icon name="fa-solid fa-location-dot" size="sm" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-body1">Current location</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
      <div>
        <q-list>
          <q-item
            v-for="location in currentListOfLocations"
            :key="location.name"
            @click="itemSelected(location)"
            clickable
          >
            <q-item-section>
              <q-item-label>{{ location.name }}</q-item-label>
              <q-item-label caption>{{ location.country }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="search-container">
        <q-input
          v-model="search"
          placeholder="Search location"
          dense
          borderless
          class="search-input"
        >
          <template #append>
            <q-icon name="fa-solid fa-magnifying-glass" />
          </template>
        </q-input>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { watch } from 'vue';
import { useLocationStore } from 'src/stores/locationSearchStore';
import { useWeatherStore } from 'src/stores/weatherStore';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { Notify } from 'quasar';
import type CurrentWeather from 'src/data/currentWeather';
import { Geolocation } from '@capacitor/geolocation';

const $router = useRouter();
const $q = useQuasar();
const weatherStore = useWeatherStore();
type Location = CurrentWeather['location'];

const gotoSelectedLocation = async (location: Location) => {
  weatherStore.setLocation(location.name);
  try {
    await weatherStore.fetchWeatherData();
    await weatherStore.fetchForecastData();
  } catch (e) {
    Notify.create({
      type: 'negative',
      message: 'Failed to fetch weather data for the selected location.',
    });

    $q.notify({
      type: 'negative',
      message: 'Failed to fetch weather data for the selected location.',
    });

    console.error(e);
    return;
  }

  await $router.push('/currentWeather');
};

// save recently clicked weather go to current-weather view
const itemSelected = async (location: Location) => {
  console.log('Item selected:', location.name);

  // save recent item
  $q.localStorage.set('recentLocation', location);

  await gotoSelectedLocation(location);
};

const search = ref('');
const store = useLocationStore();
const recentLocation = $q.localStorage.getItem('recentLocation') as Location;
const currentListOfLocations = ref<Location[] | null>(null);
const currentGeoLocation = ref<GeolocationPosition | null>(null);

const getDistanceDeltaSquared = (loc1: Location, loc2: GeolocationPosition): number => {
  const latDiff = loc1.lat - loc2.coords.latitude;
  const lonDiff = loc1.lon - loc2.coords.longitude;
  return latDiff * latDiff + lonDiff * lonDiff;
};
const reloadLocations = () => {
  currentListOfLocations.value = [];

  // add fetched locations from store
  if (store.getResponseLocations) {
    currentListOfLocations.value.push(...store.getResponseLocations);

    // sort by distance if geolocation is available
    if (currentGeoLocation.value) {
      console.log(
        'Sorting locations by distance to current geolocation:',
        currentGeoLocation.value,
      );
      currentListOfLocations.value.sort(
        (a, b) =>
          getDistanceDeltaSquared(a, currentGeoLocation.value as GeolocationPosition) -
          getDistanceDeltaSquared(b, currentGeoLocation.value as GeolocationPosition),
      );
    } else {
      console.log('No geolocation available, not sorting locations by distance.');
    }
  }
  // add recent location at the beginning if exists and remove duplicate later in the list if exists
  if (recentLocation) {
    console.log('Adding recent location to the top of the list:', recentLocation);
    currentListOfLocations.value.unshift(recentLocation);

    // remove duplicates
    currentListOfLocations.value = currentListOfLocations.value.filter(
      (loc, index, self) =>
        index === self.findIndex((l) => l.name === loc.name && l.country === loc.country),
    );
  }

  console.log('Reloaded locations:', currentListOfLocations.value);
};

const getCurrentPositionAndTriggerReload = async () => {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lon = coordinates.coords.longitude;

    store.input = `${lat},${lon}`;
    await store.fetchLocations();

    reloadLocations();
  } catch (e) {
    console.error('Error getting current position:', e);
  }
};

// trigger when search changes
watch(
  search,
  async (val) => {
    console.log('Search input changed to:', val);

    // update store input and fetch matching locations
    store.input = val;
    if (val.trim().length > 0) {
      await store.fetchLocations();
    } else {
      store.responseLocations = null;
    }

    reloadLocations();

    // print locations from the store (use getter)
    console.log('locations from store:', store.getResponseLocations);
  },
  { immediate: false },
);

// initialise to get recent location
reloadLocations();
</script>

<style scoped>
.search-view {
  display: flex;
  flex-direction: column;

  height: 100%;
}
.q-page {
  background: white;
  max-width: 400px;
  margin: 0 auto;
}
.search-container {
  background-color: #f3ecf7;
  border-radius: 9999px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;

  /* ensure that it stays in the middle at the bottom */
  position: fixed;
  bottom: 0;
  width: calc(100% - 2rem); /* there must be a better way */
  box-sizing: border-box;
}

.search-input {
  flex: 1;
  --q-input-padding: 0;
}

.q-field__control {
  background: transparent !important;
  min-height: 0;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  padding: 1rem 2rem;
  margin-bottom: 1rem;

  background-color: #f3edf7;
}

p {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}
.current-location-card {
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 4px 0;

  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
