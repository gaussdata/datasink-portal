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
