<template>
  <button
    v-for="option in customizationOptions"
    :key="option.name"
    :aria-pressed="option.on ? true : false"
    :class="option.on || 'outline'"
    @click="$emit('optionChanged', option.name)"
  >
    <span v-if="activeCategory === 'backgrounds'">s</span>
    {{ option.name }}
  </button>
</template>

<script setup>
defineEmits(["optionChanged"]);
defineProps({ customizationOptions: Array, activeCategory: String });
</script>

<style scoped>
button {
  text-transform: capitalize;
  border-radius: 1.5rem;
  border-width: 2px;
}
</style>
