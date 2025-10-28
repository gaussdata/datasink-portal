<template>
  <div class="date-picker">
    <div
      class="date-picker-item"
      v-for="item in datePickerList"
      :key="item.value"
      :class="{ 'is-active': item.value === currentDateTag }"
      @click="onClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { createDateOptions, DEFAULT_DATE_RANGE, IDateOption } from '@/models';
import { ref } from 'vue';
const datePickerList = createDateOptions();
const currentDateTag = ref(DEFAULT_DATE_RANGE);
const emit = defineEmits(['change']);
const onClick = (item: IDateOption) => {
  if (item.value === currentDateTag.value) {
    return;
  }
  currentDateTag.value = item.value;
  emit('change', item.getDateVo());
};
</script>
<style lang="scss" scoped>
.date-picker {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-picker-item {
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.date-picker-item:hover {
  background-color: #f5f5f5;
}

.date-picker-item.is-active {
  background-color: #3eaf7c;
  color: #fff;
}
</style>
