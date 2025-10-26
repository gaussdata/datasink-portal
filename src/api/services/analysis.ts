import { DateRange, Metrics } from '@/models';

export type DateLevel = 'hour' | 'day';

export interface PvuvItem {
  date?: string;
  pv: number;
  uv: number;
  x?: string;
}

export interface TopPageItem {
  url: string;
  pv: number;
}

export class AnalysisService {
  private baseUrl = '/api/datasink/analysis';

  /**
   * 获取 PVUV 数据
   * @param dateLevel 日期级别，hour 或 day
   * @param endTime 结束时间，默认当前时间
   * @returns PVUV 数据列表
   */
  async getPvuv(dateLevel: DateLevel, dateRange: DateRange): Promise<PvuvItem[]> {
    const res = await fetch(`${this.baseUrl}/pvuv?date_level=${dateLevel}&start_time=${dateRange.startTime}&end_time=${dateRange.endTime}`).then(r => r.json());
    const data: any[] = res?.data || [];
    data.forEach(item => {
      const d: string = item.date || '';
      item.x = dateLevel === 'hour' ? d.slice(11, 13) : d.slice(8, 10);
    });
    return data as PvuvItem[];
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
