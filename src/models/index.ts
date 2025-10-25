import { formatInt, formatPercentage, millisecondToSecond } from '@/utils';

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
      label: '浏览量',
      value: formatInt(metrics[MetricType.PAGEVIEWS]),
    },
    {
      label: '访问次数',
      value: formatInt(metrics[MetricType.VISITS]),
    },
    {
      label: '访客',
      value: formatInt(metrics[MetricType.VISITORS]),
    },
    {
      label: '跳出率',
      value: formatPercentage(metrics[MetricType.BOUNCES]),
    },
    {
      label: '平均会话时长',
      value: millisecondToSecond(metrics[MetricType.TOTAL_TIME]),
    },
  ];
};
