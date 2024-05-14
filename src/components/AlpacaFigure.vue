<template>
  <figure id="alpaca">
    <img
      v-for="[category, value] in customizations"
      :src="src(category, value)"
      :key="category + value"
      :alt="category + ': ' + value"
      :id="category"
    />
    <img :src="src('nose')" id="nose" />
  </figure>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({ data: Object });
const customizations = computed(() =>
  props.data.map((entry) => {
    const category = entry.category;
    const option = entry.values.find((v) => v.on)?.id;
    return [category, option];
  })
);

const src = (category, name) => {
  if (name) {
    return new URL(`../assets/alpaca/${category}/${name}.png`, import.meta.url);
  } else {
    return new URL(`../assets/alpaca/${category}.png`, import.meta.url);
  }
};
</script>

<style lang="postcss">
figure {
  border: 1px solid white;
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  & * {
    height: 100%;
    width: 100%;
    position: absolute;
  }
  img {
    &[id="backgrounds"] {
      z-index: 101;
    }
    &[id="neck"] {
      z-index: 102;
    }
    &[id="nose"] {
      z-index: 103;
    }
    &[id="ears"] {
      z-index: 104;
    }
    &[id="hair"] {
      z-index: 105;
    }
    &[id="eyes"] {
      z-index: 106;
    }
    &[id="mouth"] {
      z-index: 107;
    }
    &[id="accessories"] {
      z-index: 108;
    }
    &[id="leg"] {
      z-index: 109;
    }
  }
}
</style>
