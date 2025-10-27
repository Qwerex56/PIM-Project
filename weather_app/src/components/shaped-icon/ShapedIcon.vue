<template>
<div class="shaped-icon">
  <font-awesome-icon icon="fa-solid {{ props.icon?? 'fa-circle' }}" width-auto/>
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
}
</style>
