<template>
  <q-card flat class="status-card flex q-pa-sm row items-center">
    <div class="icon-wrapper flex-center q-mr-sm">
      <ShapedIcon class="flex items-center justify-center" />
    </div>
    <div class="column justify-center">
      <div class="text-weight-medium text-body2 text-dark">{{ props.title }}</div>
      <div class="text-caption text-grey-8">{{ props.value }}</div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import ShapedIcon from '../shaped-icon/ShapedIcon.vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    value: string;
    icon?: string;
  }>(),
  {
    title: 'Status name',
    value: 'Status value',
    icon: 'circle',
  },
);
</script>

<style scoped>
.status-card {
  background-color: #ebe3ff;
  border-radius: .75rem;
}

.icon-wrapper {
  border-radius: 50%;
}
</style>
