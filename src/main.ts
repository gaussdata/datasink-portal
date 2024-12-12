import "@/style.css";
import { onDOMContentLoaded } from "@/window.ts";
import { renderChart, updateChart, renderList } from "@/render.ts";

const BASE_URL = "/api/datasink";

const fetchTop10 = async () => {
  const $div = document.getElementById("pv-top10") as HTMLCanvasElement;
  const res = await fetch(BASE_URL + "/pv-top10").then((res) => res.json());
  const data = res?.data || [];
  data.forEach((item: any) => {
    item.label = item.page_title;
    item.href = item.page_url;
    item.count = item.view_count;
    item.percent = item.view_percent;
  })
  renderList($div, data, "浏览页面 Top10");
};

const fetchHour24 = async () => {
  const $canvas = document.getElementById("pvuv-hour24") as HTMLCanvasElement;
  const chart = renderChart($canvas, [], "最近 24 小时访问量");
  const res = await fetch(BASE_URL + "/pvuv-hour24").then((res) => res.json());
  const data = res?.data || [];
  data.forEach((item: any) => {
    item.x = item.hour.slice(11, 13);
  });
  updateChart(chart, data);
};

const fetchDay7 = async () => {
  const $canvas = document.getElementById("pvuv-day7") as HTMLCanvasElement;
  const chart = renderChart($canvas, [], "最近 7 天访问量");
  const res = await fetch(BASE_URL + "/pvuv-day7").then((res) => res.json());
  const data = res?.data || [];
  data.forEach((item: any) => {
    item.x = item.day.slice(8, 10);
  });
  updateChart(chart, data);
};

const fetchWeek4 = async () => {
  const $canvas = document.getElementById("pvuv-week4") as HTMLCanvasElement;
  const chart = renderChart($canvas, [], "最近 4 周访问量");
  const res = await fetch(BASE_URL + "/pvuv-week4").then((res) => res.json());
  const data = res.data;
  data.forEach((item: any) => {
    item.x = item.week;
  });
  updateChart(chart, data);
};

const fetchMonth6 = async () => {
  const $canvas = document.getElementById("pvuv-month6") as HTMLCanvasElement;
  const chart = renderChart($canvas, [], "最近 6 月访问量");
  const res = await fetch(BASE_URL + "/pvuv-month6").then((res) => res.json());
  const data = res.data;
  data.forEach((item: any) => {
    item.x = item.month;
  });
  updateChart(chart, data);
};

onDOMContentLoaded(() => {
  fetchTop10();
  fetchHour24();
  fetchDay7();
  fetchWeek4();
  fetchMonth6();
});

export default {};
