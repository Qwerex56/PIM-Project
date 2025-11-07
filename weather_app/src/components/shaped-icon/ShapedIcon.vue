<template>
  <div class="shaped-icon">
    <font-awesome-icon :icon="icon ?? 'fa-solid fa-house'" width-auto />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineProps<{
  icon?: string
}>();
</script>

<style scoped lang="css">
.shaped-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* fixed square with padding included so it stays a circle */
  width: 2.0rem;
  height: 2.0rem;
  padding: .375rem;
  box-sizing: border-box;

  border-radius: 50%;
  overflow: hidden;

  background-color: #6750a4;
  color: white;

  /* small external spacing */
  margin: 0.25rem;
}


</style>
