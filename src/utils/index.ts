import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


export function percentage(value: number, total: number) {
  return (value / total) * 100;
}
export function formatInt(num: number) {
  return num.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export function formatPercentage(num: number) {
  return `${num.toFixed(0)}%`;
}

export function millisecondToSecond(num: number) {
  return (num / 1000).toFixed(0) + 's';
}

export function formatDuration(num: number, format: string = 'm[m] ss[s]') {
  return dayjs.duration(num).format(format);
}