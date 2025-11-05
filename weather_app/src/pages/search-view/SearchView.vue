<template>
  <main class="main-view">
  <div class="top-bar">
    <font-awesome-icon :icon="faBars" size="2x" />
    <p>Weather App</p>
    <font-awesome-icon :icon="faUser" size="2x" />
  </div>

  <section>
    <q-card column flat bordered class="current-location-card">
    <q-item clickable>
      <q-item-section avatar>
        <q-icon name="fa-solid fa-location-dot" size="sm" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-body1">Current location</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
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
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const search = ref('')
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

  background-color: #F3EDF7;
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
