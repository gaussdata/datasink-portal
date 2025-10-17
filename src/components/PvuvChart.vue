<template>
  <div :class="wrapperClass">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import Chart from 'chart.js/auto';
import { analysisService } from '@/api/services/analysis.ts';

interface ViewDataItem {
  x: string;
  pv: number;
  uv: number;
  date?: string;
}

const props = defineProps<{ 
  dateLevel: 'hour' | 'day';
  title?: string;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

async function fetchData(): Promise<ViewDataItem[]> {
  const data = await analysisService.getPvuv(props.dateLevel);
  return data as ViewDataItem[];
}

function render(data: ViewDataItem[]) {
  if (!canvasRef.value) return;
  if (chart) {
    chart.destroy();
    chart = null;
  }
  chart = new Chart(canvasRef.value, {
    type: 'line',
    options: {
      animations: { tension: { duration: 1000, easing: 'linear', from: 1, to: 0, loop: false } },
      responsive: true,
      interaction: { intersect: false },
      plugins: {
        title: { display: !!props.title, text: props.title || '' },
        legend: { display: true },
        tooltip: { enabled: true }
      }
    },
    data: {
      labels: data.map(row => row.x),
      datasets: [
        { label: 'PV', data: data.map(row => row.pv) },
        { label: 'UV', data: data.map(row => row.uv) }
      ]
    }
  });
}

onMounted(async () => {
  const data = await fetchData();
  render(data);
});

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy();
    chart = null;
  }
});

const wrapperClass = computed(() => props.dateLevel === 'hour' ? 'chart-pv' : 'chart-uv');
</script>

<style scoped>
.chart-pvuv-title {
    color: #666;
    font-size: 16px;
    text-align: center;
}

.chart-pv,
.chart-uv {
    width: 600px;
    display: flex;
    align-items: center;
}

.chart-pv-total,
.chart-uv-total {
    width: 100px;
    text-align: center;
    font-size: 18px;
}

.chart-pv canvas,
.chart-uv canvas {
   width: calc(100% - 100px);
   height: 100px;
}
</style>