<template>
  <figure id="alpaca">
    <TransitionGroup>
      <div
        v-for="[category, value] in customizations"
        :style="{ backgroundImage: `url(${src(category, value)})` }"
        :key="category + value"
        :id="category"
        :class="animate(category)"
      ></div>
    </TransitionGroup>
  </figure>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({ data: Object });
const customizations = computed(() => {
  const map = props.data.map((entry) => {
    const category = entry.category;
    const option = entry.values.find((v) => v.on)?.id;
    return [category, option];
  });
  map.push(["nose", ""]);
  return map;
});

const src = (category, name) => {
  if (name) {
    return new URL(`../assets/alpaca/${category}/${name}.png`, import.meta.url);
  } else {
    return new URL(`../assets/alpaca/${category}.png`, import.meta.url);
  }
};
const animate = (category) => {
  if (category === "backgrounds") {
    return "animate";
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
  div {
    background-size: 100% 100%;
    &[id="backgrounds"] {
      z-index: 101;
    }
    &[id="ears"] {
      z-index: 102;
    }
    &[id="neck"] {
      z-index: 103;
    }
    &[id="nose"] {
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
  .v-enter-active.animate,
  .v-leave-active.animate {
    transition: opacity 0.3s ease;
  }
  .v-enter-from.animate,
  .v-leave-to.animate {
    opacity: 0;
  }
}
</style>
