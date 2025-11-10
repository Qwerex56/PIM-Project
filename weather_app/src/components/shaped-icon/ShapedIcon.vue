<template>
  <div class="shaped-icon">
    <q-icon :name="icon ?? 'circle'" size="1.5rem" />
  </div>
</template>

<script setup lang="ts">
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
  width: fit-content;
  height: fit-content;
  padding: .25rem;
  box-sizing: border-box;

  border-radius: 999px;
  overflow: hidden;

  background-color: #6750a4;
  color: white;
}


</style>
