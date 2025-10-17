<template>
  <div :class="wrapperClass">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import Chart from 'chart.js/auto';

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

const BASE_URL = '/api/datasink/analysis';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

async function fetchData(): Promise<ViewDataItem[]> {
  const res = await fetch(`${BASE_URL}/pvuv?date_level=${props.dateLevel}&end_time=${Date.now()}`).then(r => r.json());
  const data: any[] = res?.data || [];
  data.forEach(item => {
    const d: string = item.date || '';
    item.x = props.dateLevel === 'hour' ? d.slice(11, 13) : d.slice(8, 10);
  });
  return data;
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
</style>