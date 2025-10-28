<template>
  <div ref="containerRef" class="area-chart" @mousemove="handleMouseMove">
    <svg :width="svgWidth" :height="svgHeight">
      <!-- 定义渐变 -->
      <defs>
        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" :stop-color="colors[0]" stop-opacity="0.8" />
          <stop offset="100%" :stop-color="colors[1]" stop-opacity="0.2" />
        </linearGradient>
      </defs>

      <!-- 绘制矩形 -->
      <rect
        v-for="(value, index) in data"
        :key="index"
        :x="calcX(index)"
        :y="0"
        :data-value="value"
        :width="1"
        :height="calcY(value)"
        fill="#3eaf7c33"
      />
      <!-- 绘制面积 -->
      <path :d="pathData" fill="url(#areaGradient)" stroke="none" />

      <!-- 绘制线条 -->
      <path :d="pathData.replace(/Z$/, '')" fill="none" :stroke="colors[0]" stroke-width="2" />

      <!-- 绘制数据点 -->
      <circle
        v-for="(value, index) in data"
        :key="index"
        :cx="calcX(index)"
        :cy="calcY(value)"
        r="4"
        :fill="colors[0]"
        stroke="white"
        stroke-width="1.5"
      />
    </svg>
    <div class="chart-tooltip" v-show="showTooltip" :style="{ left: `${tooltipX}px`, top: `${tooltipY}px` }">
      <div class="tooltip-content">
        <span class="tooltip-label">{{ currentLabel }}</span>
        <span class="tooltip-value">{{ currentValue }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { emitter } from '@/utils/mitter';
import { ref, onMounted, computed, onUnmounted } from 'vue';
const props = defineProps({
  data: {
    default: () => [] as number[],
  },
  xLabels: {
    default: () => [] as string[],
  },
  colors: {
    default: () => ['#3eaf7c', '#3eaf7c'],
  },
});

const containerRef = ref<HTMLDivElement>();
const svgWidth = ref(100);
const svgHeight = ref(100);
const PADDING = 12;

// 计算SVG路径
const pathData = computed(() => {
  if (!props.data.length) return '';
  const WIDTH = svgWidth.value - PADDING * 2;
  const HEIGHT = svgHeight.value - PADDING * 2;

  const maxValue = Math.max(...props.data);
  const minValue = Math.min(...props.data);
  const valueRange = maxValue - minValue;

  const points = props.data.map((value, index) => {
    const x = (index / (props.data.length - 1)) * WIDTH + PADDING;
    const percent = ((value - minValue) / valueRange) * 100;
    const y = Math.round(HEIGHT - (percent / 100) * HEIGHT) + PADDING;
    return `${x},${y}`;
  });
  // 创建面积路径
  let path = `M ${points[0]} L ${points.slice(1).join(' ')}`;
  path += ` L ${WIDTH + PADDING},${HEIGHT + PADDING} L ${PADDING},${HEIGHT + PADDING} Z`;

  return path;
});

// 计算X坐标
const calcX = (index: number) => {
  if (!props.data.length) return 0;
  const WIDTH = svgWidth.value - PADDING * 2;
  return (index / (props.data.length - 1)) * WIDTH + PADDING;
};

// 计算Y坐标
const calcY = (value: number) => {
  if (!props.data.length) return 0;
  const maxValue = Math.max(...props.data);
  const minValue = Math.min(...props.data);
  const valueRange = maxValue - minValue;
  const HEIGHT = svgHeight.value - PADDING * 2;
  return HEIGHT - ((value - minValue) / valueRange) * HEIGHT + PADDING;
};

// 初始化尺寸
const initSize = () => {
  if (containerRef.value) {
    svgWidth.value = containerRef.value.clientWidth;
  }
};

// 工具提示相关状态
const showTooltip = ref(false);
const currentLabel = ref('');
const currentValue = ref(0);
const tooltipX = ref(0);
const tooltipY = ref(0);

// 处理鼠标悬停事件
const handleMouseMove = (e: MouseEvent) => {
  const rect = containerRef.value?.getBoundingClientRect();
  if (!rect) {
    showTooltip.value = false;
    return;
  }
  const x = e.clientX - rect.left;
  const WIDTH = svgWidth.value - PADDING * 2;
  const GAP = WIDTH / (props.data.length - 1);
  const index = Math.round((x - PADDING) / GAP);
  emitter.emit('hoverIndex', index);
};

const onHoverIndex = (index: unknown) => {
  if (typeof index !== 'number') {
    return;
  }
  currentLabel.value = props.xLabels[index] || '';
  currentValue.value = props.data[index] || 0;
  showTooltip.value = true;
  tooltipX.value = calcX(index);
  tooltipY.value = calcY(currentValue.value) - PADDING;
}

// 处理鼠标移出事件
const handleMouseOut = () => {
  showTooltip.value = false;
};

// 在挂载后初始化尺寸
onMounted(() => {
  initSize();
  emitter.on('hoverIndex', onHoverIndex);
  emitter.on('mouseOut', handleMouseOut);
  window.addEventListener('resize', initSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', initSize);
  emitter.off('hoverIndex', onHoverIndex);
  emitter.off('mouseOut', handleMouseOut);
});
</script>
<style lang="scss" scoped>
.area-chart {
  position: relative;
  padding-top: 12px;
  width: 100%;
}
.chart-tooltip {
  position: absolute;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  pointer-events: none;
  transform: translate(-50%, -50%);
}
.tooltip-content {
  display: flex;
  align-items: center;
  gap: 4px;
  width: max-content;
}
.tooltip-label {
  color: #666;
  font-size: 16px;
  line-height: 20px;
}
.tooltip-value {
  font-weight: bold;
  color: #181818;
  font-size: 16px;
  line-height: 20px;
}
</style>
