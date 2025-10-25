<template>
  <div class="metrics-container">
    <h2 class="title">{{ title }}</h2>
    <div class="metric-list">
 <div class="metric-item" v-for="item in metricsList" :key="item.label">
      <div class="metric-label">{{ item.label }}</div>
      <div class="metric-value">{{ item.value }}</div>
    </div>
    </div>
   
  </div>
</template>
<script lang="ts" setup>
import { analysisService } from '@/api/services/analysis';
import { createMetricsList, Metrics } from '@/models';
import { computed, onMounted, ref } from 'vue';
defineProps<{ title?: string }>();

const metrics = ref<Metrics>(new Metrics());
const metricsList = computed(() => createMetricsList(metrics.value));

onMounted(async () => {
  metrics.value = await analysisService.getMetrics();
});
</script>
<style lang="scss" scoped>
.title {
  color: #666;
  font-size: 16px;
  text-align: center; 
  margin-bottom: 16px;
}

.metric-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 12px;
}

.metric-item {
  width: 150px;
}
.metric-label {
  font-size: 14px;
  color: #4b4b4b;
}
.metric-value {
   font-weight: bold;
   font-size: 36px;
   color: #2c2c2c;
}
</style>
