<template>
  <div class="grid-container">
    <div class="box box1">
      <PvuvChart dateLevel="hour" title="最近 24 小时访问量" />
    </div>
    <div class="box box2">
      <PvuvChart dateLevel="day" title="最近 30 天访问量" />
    </div>
    <div class="box box3">
      <TopPagesList title="浏览页面 Top10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PvuvChart from './components/PvuvChart.vue';
import TopPagesList from './components/TopPagesList.vue';
</script>