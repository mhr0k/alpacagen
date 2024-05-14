<template>
  <div>
    <button @click="$emit('randomize')">Randomize</button>
    <button @click="$emit('download')">Download</button>
  </div>
</template>

<script setup></script>

<style scoped>
div {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
button {
  margin: 1rem 1rem 0 1rem;
}
</style>
