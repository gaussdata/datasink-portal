import Chart from "chart.js/auto";

export function renderChart(dom: HTMLCanvasElement, data: any[], title = "") {
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

export function updateChart(chart: Chart, data: any[]) {
  chart.data = {
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
  };
  chart.update();
}

export function renderList(dom: HTMLCanvasElement, data: any[], title = "") {
  const $title = document.createElement('h2');
  $title.classList.add('title')
  $title.innerText = title;
  dom.appendChild($title);
  const $list = document.createElement('ul');
  $list.classList.add('list');
  data.forEach(item => {
    const $item = document.createElement('li');
    $item.classList.add('list-item');
    $item.innerHTML = `<a target="__blank" href="${item.href}"><div class="bar">
      <div class="bar-inner">
        <span>${item.label}</span>
        <span>${item.count}</span>
      </div>
      <div class="bar-back" style="width: ${Math.round(item.percent)}%"></div>
    </div></a>`;
    $list.appendChild($item);
  })
  dom.appendChild($list);
}
