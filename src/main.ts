import "@/styles/layout.css";
import "@/styles/pvuv.css";
import "@/styles/top-pages.css"
import { onDOMContentLoaded } from "@/window.ts";
import { renderChart, renderList } from "@/render.ts";

const BASE_URL = "/api/datasink/analysis";

const fetchHour24 = async () => {
  const $div = document.getElementById("pvuv-hour") as HTMLCanvasElement;
  const res = await fetch(BASE_URL + "/pvuv?date_level=hour").then((res) => res.json());
  const data = res?.data || [];
  data.forEach((item: any) => {
    item.x = item.date.slice(11, 13);
  });
  renderChart($div, data, "最近 24 小时访问量");
};

const fetchDay30 = async () => {
  const $div = document.getElementById("pvuv-day") as HTMLCanvasElement;
  const res = await fetch(BASE_URL + "/pvuv?date_level=day").then((res) => res.json());
  const data = res?.data || [];
  data.forEach((item: any) => {
    item.x = item.date.slice(8, 10);
  });
  renderChart($div, data, "最近 30 天访问量");
};

const fetchTop10 = async () => {
  const $div = document.getElementById("pv-top10") as HTMLDivElement;
  const res = await fetch(BASE_URL + "/top-pages").then((res) => res.json());
  const data = res?.data || [];
  renderList($div, data, "浏览页面 Top10");
};

onDOMContentLoaded(() => {
  fetchHour24();
  fetchDay30();
  fetchTop10();
});

export default {};
