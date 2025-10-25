<template>
  <div class="grid-container">
    <div class="box box-metrics">
      <Metrics title="访问量统计" />
    </div>
    <div class="box box-top-pages">
      <TopPages title="页面 Top10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Metrics from './components/Metrics.vue';
import TopPages from './components/TopPages.vue';
</script>

<style lang="scss" scoped>
.grid-container {
  width: 100%;
  max-width: 1280px;
  margin: 12px auto 12px;
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(100px, auto);
}

.grid-container .box {
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #ededed;
  grid-column: span 1;
  grid-row: span 1;
}

.grid-container .box:hover {
  border-color: #3eaf7c;
}

.grid-container .box.box-metrics {
  grid-column: span 12;
  grid-row: span 1;
}

.grid-container .box.box-top-pages {
  grid-column: span 12;
  grid-row: span 4;
}

@media screen and (max-width: 768px) {
  .grid-container .box.box-metrics,
  .grid-container .box.box-top-pages {
    grid-column: span 12;
  }
}
</style>
