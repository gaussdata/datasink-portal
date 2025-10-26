import { formatInt, formatPercentage, millisecondToSecond } from '@/utils';
import dayjs from 'dayjs';

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

export const DEFAULT_DATE_RANGE = '7d';

export class DateRange {
  startTime: number = dayjs().subtract(7, 'day').startOf('day').valueOf();
  endTime: number = dayjs().endOf('day').valueOf();
}

export interface DateOption {
  label: string;
  value: string;
  getDateRange: () => DateRange;
}

export const createDateOptions = (): DateOption[] => {
  return [
    {
      label: '7 天',
      value: '7d',
      getDateRange() {
        return {
          startTime: dayjs().subtract(7, 'day').startOf('day').valueOf(),
          endTime: dayjs().endOf('day').valueOf(),
        }
      }
    },
    {
      label: '30 天',
      value: '30d',
      getDateRange() {
        return {
          startTime: dayjs().subtract(30, 'day').startOf('day').valueOf(),
          endTime: dayjs().endOf('day').valueOf(),
        }
      }
    },
    {
      label: '365 天',
      value: '365d',
      getDateRange() {
        return {
          startTime: dayjs().subtract(365, 'day').startOf('day').valueOf(),
          endTime: dayjs().endOf('day').valueOf(),
        }
      }
    }

  ];
}