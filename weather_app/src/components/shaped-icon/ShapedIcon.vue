<template>
<div class="shaped-icon">
  <font-awesome-icon :icon="icon ?? 'fa-solid fa-house'" width-auto/>
</div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  icon?: string
}>();

</script>

<style scoped lang="css">
.shaped-icon {
  padding: .375rem;

  border-radius: 9999px;

  background-color: #6750A4;
  color: white;
}
</style>
