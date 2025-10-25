<template>
  <div class="top-pages-list" v-loading="loading">
    <h2 class="title">{{ title }}</h2>
    <ul class="list">
      <li v-for="item in data" :key="item.url" class="list-item">
        <a :href="item.url" target="__blank">
          <div class="bar">
            <div class="bar-inner">
              <span>{{ urlPath(item.url) }}</span>
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
import { onMounted, ref, computed, watch } from 'vue';
import { analysisService, type TopPageItem } from '@/api/services/analysis.ts';
import { DateRange } from '@/models';

const props = defineProps({
  title: {
    default: '页面 Top10',
  },
  dateRange: {
    default: () => new DateRange(),
  },
});

const loading = ref(false);

const data = ref<TopPageItem[]>([]);
const getTopPages = async () => {
  loading.value = true;
  try {
    data.value = await analysisService.getTopPages(props.dateRange);
  } finally {
    loading.value = false;
  }
}

const total = computed(() => data.value.reduce((a, b) => a + (b.pv || 0), 0));

watch(() => props.dateRange, () => {
  getTopPages();
});
onMounted(async () => {
  getTopPages();
});

function barWidth(item: TopPageItem) {
  const t = total.value;
  const pct = t > 0 ? Math.round(100 * item.pv / t) : 0;
  return `${pct}%`;
}

function urlPath(url: string) {
  return new URL(url).pathname;
}
</script>

<style scoped>
.title {
  color: #666;
  font-size: 16px;
  text-align: center; 
  margin-bottom: 16px;
}

.list {
  padding: 0 12px;
}

.list-item {
  list-style: none;
  border: 1px solid #36a2eb;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;  
}

.list-item a {
  color: #181818;
  text-decoration: none;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.list-item .bar {
  position: relative;
}

.list-item .bar-inner {
  padding: 4px;
  display: flex;
  justify-content: space-between;
}

.list-item .bar-back {
  position: absolute;
  z-index: -1;
  top: 0;
  height: 100%;
  background-color: #bdd6fe;
}
</style>