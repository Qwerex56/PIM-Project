<template>
  <div class="seamless-search-bar">
    <input ref="inputRef" type="text" v-model="searchModel">
    <img :src="searchIcon" alt="look" @click="focusInput">
  </div>
</template>

<script setup lang="ts">
import searchIcon from 'src/assets/component-icons/search-icon.svg';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  searchHint?: string
}>();

const searchModel = defineModel<string>('searchModel', {
  default: ''
});

const inputRef = ref<HTMLInputElement | null>(null);

const focusInput = () => {
  inputRef.value?.focus();
};

onMounted(() => {
  if (props.searchHint) {
    searchModel.value = props.searchHint;
  }
})
</script>

<style scoped>
.seamless-search-bar {
  display: flex;
  flex-direction: row;

  justify-content: space-between;

  background-color: transparent;
}

input {
  border: none;
  outline: none;

  background-color: transparent;

  font-size: 1rem;
  font-weight: 500;
}
</style>
