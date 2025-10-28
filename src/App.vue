<template>
  <div>
    <div class="tool-container">
      <DatePicker title="选择日期" @change="onDateChange" />
    </div>
    <div class="grid-container">
      <div class="box box-metrics">
        <Metrics title="访问量统计" :dateVo="dateVo" />
      </div>
      <div class="box box-area-chart">
        <BasicTrend title="访问量趋势" :dateVo="dateVo"/>
      </div>
      <div class="box box-top-pages">
        <TopPages title="页面 Top10" type="url" :dateVo="dateVo" />
      </div>
      <div class="box box-top-referers">
        <TopPages title="来源 Top10" type="referrer" :dateVo="dateVo" />
      </div>
      <div class="box box-top-oses">
        <TopPages title="操作系统 Top10" type="os" :dateVo="dateVo" />
      </div>
      <div class="box box-top-browsers">
        <TopPages title="浏览器 Top10" type="browser" :dateVo="dateVo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BasicTrend from './components/BasicTrend.vue';
import DatePicker from './components/DatePicker.vue';
import Metrics from './components/Metrics.vue';
import TopPages from './components/TopPages.vue';
import { DateVo } from './models';

const dateVo = ref(new DateVo());
const onDateChange = (value: DateVo) => {
  dateVo.value = value;
};
</script>

<style lang="scss" scoped>
.tool-container {
  width: 100%;
  max-width: 1280px;
  margin: 12px auto 12px;
}

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
  border-color: #3eaf7c;
}

.grid-container .box.box-date {
  grid-column: span 12;
  grid-row: span 1;
}

.grid-container .box.box-area-chart,
.grid-container .box.box-metrics {
  grid-column: span 12;
  grid-row: span 1;
}

.grid-container .box.box-top-pages,
.grid-container .box.box-top-referers,
.grid-container .box.box-top-oses,
.grid-container .box.box-top-browsers {
  grid-column: span 6;
  grid-row: span 4;
}

@media screen and (max-width: 960px) {
  .grid-container .box.box-top-pages,
  .grid-container .box.box-top-referers,
  .grid-container .box.box-top-oses,
  .grid-container .box.box-top-browsers {
    grid-column: span 12;
  }
}
</style>
