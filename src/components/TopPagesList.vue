<template>
  <div>
    <h2 class="title">{{ title }}</h2>
    <ul class="list">
      <li v-for="item in data" :key="item.url" class="list-item">
        <a :href="item.url" target="__blank">
          <div class="bar">
            <div class="bar-inner">
              <span>{{ item.url }}</span>
              <span>{{ item.pv }}</span>
            </div>
            <div class="bar-back" :style="{ width: barWidth(item) }"></div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';

const props = defineProps<{ title?: string }>();
const BASE_URL = '/api/datasink/analysis';

interface TopPageDataItem {
  pv: number;
  url: string;
}

const data = ref<TopPageDataItem[]>([]);

onMounted(async () => {
  const res = await fetch(`${BASE_URL}/top-pages?end_time=${Date.now()}`).then(r => r.json());
  data.value = (res?.data || []) as TopPageDataItem[];
});

const total = computed(() => data.value.reduce((a, b) => a + (b.pv || 0), 0));

function barWidth(item: TopPageDataItem) {
  const t = total.value;
  const pct = t > 0 ? Math.round(100 * item.pv / t) : 0;
  return `${pct}%`;
}
</script>

<style scoped>
</style>