<template>
  <button
    v-for="category in categories"
    :key="category"
    :aria-pressed="active === category ? true : false"
    :aria-label="`category: ${category}`"
    :class="active === category || 'outline'"
    @click="$emit('categoryChanged', category)"
  >
    {{ category }}
  </button>
</template>

<script setup>
defineProps({ categories: Array, active: String });
defineEmits(["categoryChanged"]);
</script>

<style scoped>
button {
  text-transform: capitalize;
  border-radius: 1.5rem;
  border-width: 2px;
}
</style>
