<template>
  <div class="basic-trend">
    <div class="title">{{ title }}</div>
    <div class="trend-content" @mouseout="handleMouseOut">
      <div class="trend-row">
        <div class="trend-total">
          <div>浏览量</div>
          <div class="trend-total-value">{{ totalPageView }}</div>
        </div>
        <div class="trend-chart">
          <AreaChart :data="pvData" :xLabels="xLabels" />
        </div>
      </div>
      <div class="trend-row">
        <div class="trend-total">
          <div>访客</div>
          <div class="trend-total-value">{{ totalVisitor }}</div>
        </div>
        <div class="trend-chart">
          <AreaChart :data="uvData" :xLabels="xLabels" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { analysisService } from '@/api/services/analysis';
import AreaChart from '@/components/AreaChart.vue';
import { DateVo } from '@/models';
import { emitter } from '@/utils/mitter';
import { computed, onMounted, ref, watch } from 'vue';
const props = defineProps({
  title: {
    default: '',
  },
  dateVo: {
    default: () => new DateVo(),
  },
});
const pvData = ref<number[]>([]);
const uvData = ref<number[]>([]);
const xLabels = ref<string[]>([]);

const getTrendData = () => {
  analysisService.getPvuv(props.dateVo.level, props.dateVo.range).then(res => {
    pvData.value = res.map(item => item.pv);
    uvData.value = res.map(item => item.uv);
    xLabels.value = res.map(item => item.x);
  });
};
const totalPageView = computed(() => pvData.value.reduce((a, b) => a + b, 0));
const totalVisitor = computed(() => uvData.value.reduce((a, b) => a + b, 0));

const handleMouseOut = () => {
  emitter.emit('mouseOut');
};

watch(
  () => props.dateVo,
  () => {
    getTrendData();
  },
);
onMounted(() => {
  getTrendData();
});
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
  font-weight: bold;
}
.trend-row {
  display: flex;
  align-items: center;
  gap: 16px;
  .trend-total {
    width: 80px;
    font-size: 14px;
  }
  .trend-total-value {
    font-weight: bold;
    font-size: 24px;
  }
  .trend-chart {
    flex: 1;
    padding-right: 16px;
  }
}
</style>
