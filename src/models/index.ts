import { formatDuration, formatInt, formatPercentage, millisecondToSecond } from '@/utils';
import dayjs from 'dayjs';

export enum DateLevel {
  HOUR = 'hour',
  DAY = 'day',
  MONTH = 'month',
}

export interface ChartPoint {
  label: string;
  value: number;
}

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
      value: formatDuration(metrics[MetricType.TOTAL_TIME]),
    },
  ];
};

export const DEFAULT_DATE_RANGE = '24h';

export class DateRange {
  startTime: number = dayjs().subtract(24, 'hour').startOf('hour').valueOf();
  endTime: number = dayjs().endOf('hour').valueOf();
}

export interface IDateOption {
  label: string;
  value: string;
  getDateVo: () => DateVo;
}

export class DateVo {
  level: DateLevel = DateLevel.HOUR;
  range: DateRange = new DateRange();
}

export const createDateOptions = (): IDateOption[] => {
  return [
    {
      label: '24 小时',
      value: '24h',
      getDateVo() {
        return {
          level: DateLevel.HOUR,
          range: {
            startTime: dayjs().subtract(24, 'hour').startOf('hour').valueOf(),
            endTime: dayjs().endOf('hour').valueOf(),
          }
        }
      }
    },
    {
      label: '7 天',
      value: '7d',
      getDateVo() {
        return {
          level: DateLevel.DAY,
          range: {
            startTime: dayjs().subtract(7, 'day').startOf('day').valueOf(),
            endTime: dayjs().endOf('day').valueOf(),
          }
        }
      }
    },
    {
      label: '30 天',
      value: '30d',
      getDateVo() {
        return {
          level: DateLevel.DAY,
          range: {
            startTime: dayjs().subtract(30, 'day').startOf('day').valueOf(),
            endTime: dayjs().endOf('day').valueOf(),
          }
        }
      }
    },
    {
      label: '12 月',
      value: '12m',
      getDateVo() {
        return {
          level: DateLevel.MONTH,
          range: {
            startTime: dayjs().subtract(12, 'month').startOf('month').valueOf(),
            endTime: dayjs().endOf('month').valueOf(),
          }
        }
      }
    },
  ];
}