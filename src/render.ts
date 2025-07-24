import Chart from "chart.js/auto";

interface ViewDataItem {
  x: string;
  pv: number;
  uv: number;
}

export function renderChart(dom: HTMLCanvasElement, data: ViewDataItem[], title = "") {
  return new Chart(dom, {
    type: "line",
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: false,
        },
      },
      responsive: true,
      interaction: {
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: title,
        },
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
    },
    data: {
      labels: data.map((row) => row.x),
      datasets: [
        {
          label: "PV",
          data: data.map((row) => row.pv),
        },
        {
          label: "UV",
          data: data.map((row) => row.uv),
        },
      ],
    },
  });

}

interface TopPageDataItem {
  pv: number;
  url: string;
}

export function renderList(dom: HTMLDivElement, data: TopPageDataItem[], title = "") {
  const $title = document.createElement('h2');
  $title.classList.add('title')
  $title.innerText = title;
  dom.appendChild($title);
  const $list = document.createElement('ul');
  $list.classList.add('list');
  const total = data.map(item => item.pv).reduce((a,b) => a + b);
  data.forEach(item => {
    const $item = document.createElement('li');
    $item.classList.add('list-item');
    $item.innerHTML = `<a target="__blank" href="${item.url}"><div class="bar">
      <div class="bar-inner">
        <span>${item.url}</span>
        <span>${item.pv}</span>
      </div>
      <div class="bar-back" style="width: ${Math.round( 100 * item.pv / total)}%"></div>
    </div></a>`;
    $list.appendChild($item);
  })
  dom.appendChild($list);
}
