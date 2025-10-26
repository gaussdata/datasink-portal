import { DateLevel, DateRange, Metrics } from '@/models';

export interface PvUVItem {
  date: string;
  pv: number;
  uv: number;
}

export interface ChartItem {
  x: string;
  pv: number;
  uv: number;
}

export interface TopPageItem {
  url: string;
  pv: number;
}

function formatDate(date: string, dateLevel: DateLevel) {
  if (!date) {
    return '';
  }
  if (dateLevel === DateLevel.HOUR) {
    return date.slice(5, 13) + ':00';
  }
  if (dateLevel === DateLevel.DAY) {
    return date.slice(5, 10);
  }
  return date.slice(0, 8);
}

export class AnalysisService {
  private baseUrl = '/api/datasink/analysis';

  /**
   * 获取 PVUV 数据
   * @param dateLevel 日期级别，hour 或 day
   * @param endTime 结束时间，默认当前时间
   * @returns PVUV 数据列表
   */
  async getPvuv(dateLevel: DateLevel, dateRange: DateRange): Promise<ChartItem[]> {
    const res = await fetch(`${this.baseUrl}/pvuv?date_level=${dateLevel}&start_time=${dateRange.startTime}&end_time=${dateRange.endTime}`).then(r => r.json());
    const data: PvUVItem[] = res?.data || [];
    return data.map(item => {
      const d: string = item.date || '';
      return {
        pv: item.pv || 0,
        uv: item.uv || 0,
        x : formatDate(d, dateLevel)
      }
    });
  }

  /**
   * 获取 TOP 页面数据
   * @param endTime 结束时间，默认当前时间
   * @returns TOP 页面数据列表
   */
  async getTopPages(dateRange: DateRange): Promise<TopPageItem[]> {
    const res = await fetch(`${this.baseUrl}/top-pages?start_time=${dateRange.startTime}&end_time=${dateRange.endTime}`).then(r => r.json());
    return (res?.data || []) as TopPageItem[];
  }

  /**
   * 获取 TOP 引用来源数据
   * @param endTime 结束时间，默认当前时间
   * @returns TOP 引用来源数据列表
   */
  async getTopReferers(dateRange: DateRange): Promise<TopPageItem[]> {
    const res = await fetch(`${this.baseUrl}/top-referers?start_time=${dateRange.startTime}&end_time=${dateRange.endTime}`).then(r => r.json());
    return (res?.data || []) as TopPageItem[];
  }

  /**
   * 获取指标数据
   * @param endTime 结束时间，默认当前时间
   * @returns 指标数据
   */
  async getMetrics(dateRange: DateRange): Promise<Metrics> {
    const res = await fetch(`${this.baseUrl}/metrics?start_time=${dateRange.startTime}&end_time=${dateRange.endTime}`).then(r => r.json());
    return (res?.data || new Metrics()) as Metrics;
  }
}

// 导出单例，避免在组件中重复 new
export const analysisService = new AnalysisService();
