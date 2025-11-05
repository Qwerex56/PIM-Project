<script setup lang="ts">
import ShapedIcon from '../shaped-icon/ShapedIcon.vue';

// When using StatusCard, use library.add(icon name) in main script
// e.g. library.add(faAmbulance)
// usage example: <StatusCard title="Example title" value="Example value" :icon="faUser" />

const props = withDefaults(
  defineProps<{
    title?: string;
    value?: string;
    icon?: string;
  }>(),
  {
    title: 'Status name',
    value: 'Status value',
    icon: 'ambulance',
  },
);
</script>

<template>
  <q-card flat bordered class="status-card q-pa-sm row items-center">
    <div class="icon-wrapper flex-center q-mr-sm">
      <ShapedIcon :icon="props.icon" class="flex items-center justify-center" />
    </div>
    <div class="column justify-center">
      <div class="text-weight-medium text-body2 text-dark">{{ props.title }}</div>
      <div class="text-caption text-grey-8">{{ props.value }}</div>
    </div>
  </q-card>
</template>

<style scoped>
.status-card {
  background-color: #ebe3ff;
  border-radius: 12px;
  width: fit-content;
  min-width: 160px;
}

.icon-wrapper {
  border-radius: 50%;
  /* width: 32px;
  height: 32px; */
}
</style>
