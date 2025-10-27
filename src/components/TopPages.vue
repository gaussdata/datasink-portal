<template>
  <div class="top-pages-list" v-loading="loading">
    <h2 class="title">{{ title }}</h2>
    <ul class="page-list">
      <li v-for="item in data" :key="item.url" class="page-list-item">
        <div class="text">
          <!-- 我们不希望需要分析的目标网站引用本站的来源，造成数据失真 -->
          <a class="url" :href="item.url" target="_blank" rel="noopener noreferrer">
            {{ type === 'url' ? urlPath(item.url) : urlOrigin(item.url) }}
          </a>
          <span class="count">{{ item.pv }}</span>
        </div>
        <div class="bar">
          <div class="bar-inner">
            {{ barWidth(item) }}
          </div>
          <div class="bar-fill" :style="{ width: barWidth(item) }"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { analysisService, type TopPageItem } from '@/api/services/analysis.ts';
import { DateVo } from '@/models';
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps({
  title: {
    default: '页面 Top10',
  },
  type: {
    default: 'url', // url referrer
  },
  dateVo: {
    default: () => new DateVo(),
  },
});

const loading = ref(false);

const data = ref<TopPageItem[]>([]);
const getTopPages = async () => {
  loading.value = true;
  try {
    if (props.type === 'url') {
      data.value = await analysisService.getTopPages(props.dateVo.range);
    } else {
      data.value = await analysisService.getTopReferers(props.dateVo.range);
    }

  } finally {
    loading.value = false;
  }
};

const total = computed(() => data.value.reduce((a, b) => a + (b.pv || 0), 0));

watch(
  () => props.dateVo,
  () => {
    getTopPages();
  },
);
onMounted(async () => {
  getTopPages();
});

function barWidth(item: TopPageItem) {
  const t = total.value;
  const pct = t > 0 ? Math.round((100 * item.pv) / t) : 0;
  return `${pct}%`;
}

function urlPath(url: string) {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname || '/';
  } catch (error) {
    return url;
  }
}

function urlOrigin(url: string) {
  try {
    const urlObj = new URL(url);
    return urlObj.origin;
  } catch (error) {
    return url;
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
}

.page-list {
  padding: 0 12px;
}

.page-list-item {
  list-style: none;
  border: 1px solid #3eaf7c;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 32px;
  .text {
    width: calc(100% - 100px);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding: 0 8px;
  }
  .url {
    color: #181818;
    text-decoration: none;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;

    &:hover {
      color: #3eaf7c;
      text-decoration: underline;
    }
  }
  .count {
    font-weight: bold;
  }
}

.page-list-item {
  .bar {
    width: 100px;
    height: 100%;
    border-left: 1px solid #3eaf7c;
    position: relative;
  }
  .bar-inner {
    line-height: 32px;
    padding: 0 8px;
  }
  .bar-fill {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #3eaf7c77;
  }
}
</style>
