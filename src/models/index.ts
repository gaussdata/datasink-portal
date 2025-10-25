export enum MetricType {
  PAGEVIEWS = 'pageviews',
  VISITORS = 'visitors',
  VISITS = 'visits',
  BOUNCES = 'bounces',
  TOTAL_TIME = 'totaltime',
}

export class Metrics {
  [MetricType.PAGEVIEWS]: number = 0;
  [MetricType.VISITORS]: number = 0;
  [MetricType.VISITS]: number = 0;
  [MetricType.BOUNCES]: number = 0;
  [MetricType.TOTAL_TIME]: number = 0;
}

export const createMetricsList = (metrics: Metrics) => {
  return [
    {
      label: '浏览次数',
      value: metrics[MetricType.PAGEVIEWS],
    },
    {
      label: '浏览人数',
      value: metrics[MetricType.VISITORS],
    },
    {
      label: '会话次数',
      value: metrics[MetricType.VISITS],
    },
  ];
};