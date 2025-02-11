<template>
  <header>
    <h1>Alpaca Generator</h1>
  </header>
  <main>
    <section>
      <AlpacaFigure :data="alpacaCustomizationData" />
      <AlpacaActionButtons @randomize="randomize" @download="download" />
    </section>
    <section>
      <section class="flex">
        <h2 style="flex-basis: 100%">Customize the Alpaca</h2>
        <CategoryButtons
          :categories="categories"
          :active="activeCategory"
          @categoryChanged="handleCategoryChange"
        />
      </section>
      <section class="flex">
        <h2 style="flex-basis: 100%" class="topSpace">Choose style</h2>
        <PersonalizationButtons
          :customizationOptions="currentCustomizations.values"
          :activeCategory
          @optionChanged="handleOptionChange"
        />
      </section>
    </section>
  </main>
</template>

<script setup>
import CategoryButtons from './components/CategoryButtons.vue';
import PersonalizationButtons from './components/PersonalizationButtons.vue';
import AlpacaFigure from './components/AlpacaFigure.vue';
import AlpacaActionButtons from './components/AlpacaActionButtons.vue';
import appearanceOptions from './appearanceOptions.js';
import { ref, reactive, watchEffect, onMounted } from 'vue';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
const alpacaCustomizationData = reactive(appearanceOptions);
const activeCategory = ref('hair');
const categories = alpacaCustomizationData.map((c) => c.category);
const currentCustomizations = ref({});
onMounted(() => {
  function preloadImage(category, id) {
    const img = new Image();
    img.src = new URL(
      `../assets/alpaca/${category}/${id}.png`,
      import.meta.url
    );
  }
  alpacaCustomizationData.forEach((categoryData) => {
    categoryData.values.forEach((option) => {
      preloadImage(categoryData.category, option.id);
    });
  });
  alpacaCustomizationData.forEach((categoryData) => {
    if (categoryData.category === 'backgrounds') {
      categoryData.values.forEach((option) => {
        preloadImage('backgrounds', option.id);
      });
    }
  });
});
watchEffect(() => {
  currentCustomizations.value = alpacaCustomizationData.find(
    (c) => c.category === activeCategory.value
  );
});
function handleCategoryChange(category) {
  activeCategory.value = category;
}
function handleOptionChange(optionName) {
  const targetOption = currentCustomizations.value.values.find(
    (c) => c.name === optionName
  );
  for (const option of currentCustomizations.value.values) {
    if (option === targetOption) {
      if (currentCustomizations.value.optional && option.on) {
        delete option.on;
      } else {
        option.on = true;
      }
    } else {
      delete option.on;
    }
  }
}
function randomize() {
  for (const object of alpacaCustomizationData) {
    const optionsLength = object.values.length;
    const randomIndex = Math.floor(Math.random() * optionsLength);
    const randomEntryName = object.values[randomIndex].name;
    for (const entry of object.values) {
      if (entry.name === randomEntryName) {
        entry.on = true;
      } else {
        delete entry.on;
      }
    }
  }
}
randomize();
async function download() {
  const canvas = await html2canvas(document.querySelector('#alpaca'));
  canvas.toBlob((blob) => {
    saveAs(blob, 'alpaca.png');
  });
}
</script>

<style lang="postcss">
@import './assets/css/pico/css/pico.amber.min.css';
.container {
  @media screen and (max-width: 418px) {
    padding-left: 0;
  }
  section.flex {
    @media screen and (max-width: 418px) {
      padding-left: 0.5rem;
    }
  }
}
h1 {
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  margin: 1rem 0 0 1rem;
}
main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.topSpace {
  margin-top: 1rem;
}
button:hover,
button:focus {
  transform: scale(1.05);
}
</style>
