<template>
  <button
    v-for="option in customizationOptions"
    :key="option.name"
    :aria-pressed="option.on ? true : false"
    :class="option.on || 'outline'"
    @click="$emit('optionChanged', option.name)"
  >
    <span v-if="activeCategory === 'backgrounds'" class="tag">
      <i :style="{ background: tagSrc(option.id) }"></i>
    </span>
    <span :class="activeCategory === 'backgrounds' && 'after-tag'">{{
      option.name
    }}</span>
  </button>
</template>

<script setup>
defineEmits(["optionChanged"]);
const props = defineProps({
  customizationOptions: Array,
  activeCategory: String,
});
const tagSrc = (id) => {
  const url = `url(${new URL(
    `../assets/alpaca/backgrounds/${id}.png`,
    import.meta.url
  )})`;
  return url;
};
props.customizationOptions;
</script>

<style scoped>
button {
  text-transform: capitalize;
  border-radius: 1.5rem;
  border-width: 2px;
  position: relative;
}
span.tag {
  height: 100%;
}
i {
  display: inline-block;
  height: 1.3rem;
  width: 1.3rem;
  border-radius: 50%;
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
}
span.after-tag {
  padding-left: 1.8rem;
}
</style>
