import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import style from "../../../styles/borse/name/charts.module.css";
export default function HaghighiChart({ data }) {
  let temp = data;
  if (temp.length > 230) {
    temp = temp.slice(0, 230);
  }
  temp.reverse();
  const [stat, setStat] = useState([temp, "salane"]);
  const Mahane = () => {
    if (data.length > 25) {
      temp = data.slice(0, 25);
      temp.reverse();
      setStat([temp, "mahane"]);
    } else {
      temp = data;
      temp.reverse();
      setStat([temp, "mahane"]);
    }
  };
  const Faslane = () => {
    if (data.length > 70) {
      temp = data.slice(0, 70);
      temp.reverse();
      setStat([temp, "faslane"]);
    } else {
      temp = data;
      temp.reverse();
      setStat([temp, "faslane"]);
    }
  };
  const Salane = () => {
    console.log(1);
    if (data.length > 230) {
      temp = data.slice(0, 230);
      temp.reverse();
      setStat([temp, "salane"]);
    } else {
      temp = data;
      temp.reverse();
      setStat([temp, "salane"]);
    }
  };
  let buy = [];
  let label = [];
  let sell = [];
  let power = [];

  for (let i of stat[0]) {
    buy.push(i.buy);
    sell.push(i.sell);
    power.push(Math.floor((i.buy * 100) / i.sell) / 100);
    let temp2 = i.time.toString();
    let len = temp2.length;
    label.push(
      miladi_be_shamsi(
        parseInt(temp2.slice(0, len - 4)),
        parseInt(temp2.slice(len - 4, len - 2)),
        parseInt(temp2.slice(len - 2, len))
      )
    );
  }
  const data1 = {
    labels: label,
    datasets: [
      {
        type: "line",
        label: "خرید حقیقی",
        yAxisID: "A",
        data: buy,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,1)",
        pointRadius: 1,
      },
      {
        type: "line",
        label: "قروش حقیقی",
        yAxisID: "B",
        data: sell,
        fill: false,
        backgroundColor: "rgba(245, 110, 202,1)",
        borderColor: "rgba(245, 110, 202 , 1)",
        pointRadius: 1,
        tension: 0.1,
      },
      {
        type: "bar",
        label: "قدرت خریدار به فروشنده",
        yAxisID: "C",
        data: power,
        fill: false,
        borderColor: "rgba(231,237,66,1)",
        backgroundColor: "rgba(231,237,66,1)",
      },
    ],
  };
  let options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#ccc",
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "نمودار سرانه خرید و فروش حقیقی",
        color: "#ccc",
        font: {
          size: 20,
          style: "italic",
          weight: 400,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      C: {
        position: "left",
        stackWeight: 0.5,
        ticks: { display: false },
        stack: "demo",
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { display: false },
        stack: "demo",
        stackWeight: 5,
        offset: true,
        grid: { display: false },
      },

      A: {
        position: "left",
        ticks: {
          display: false,
        },
        grid: { display: false },

        offset: true,
      },
      B: {
        position: "left",
        grid: { color: "rgba(178,178,178,0.4)" },
        ticks: {
          color: "#bbb",
          display: true,
          maxTicksLimit: 5,
          callback: function (label, index, labels) {
            return mobadel(label);
          },
        },
        offset: true,
      },

      xAxes: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#bbb",
        },
      },
    },
  };
  options.plugins.zoom = {
    pan: {
      enabled: true,
      mode: "x",
    },
    zoom: {
      enabled: true,
      drag: true,
      mode: "xy",
    },
  };
  return (
    <div>
      <div className={style.btns}>
        <button
          className={style.btn}
          onClick={Salane}
          disabled={stat[1] == "salane"}
        >
          سالانه
        </button>
        <button
          className={style.btn}
          onClick={Faslane}
          disabled={stat[1] == "faslane"}
        >
          سه ماهه
        </button>
        <button
          className={style.btn}
          onClick={Mahane}
          disabled={stat[1] == "mahane"}
        >
          ماهانه
        </button>
      </div>
      <div className={style.mainchart}>
        <Line data={data1} options={options} />
      </div>
    </div>
  );
}

function miladi_be_shamsi(gy, gm, gd) {
  var g_d_m, jy, jm, jd, gy2, days;
  g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  gy2 = gm > 2 ? gy + 1 : gy;
  days =
    355666 +
    365 * gy +
    ~~((gy2 + 3) / 4) -
    ~~((gy2 + 99) / 100) +
    ~~((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1];
  jy = -1595 + 33 * ~~(days / 12053);
  days %= 12053;
  jy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if (days < 186) {
    jm = 1 + ~~(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + ~~((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return [jy + "/" + jm + "/" + jd];
}
function mobadel(number) {
  if (number < 100) return number;
  if (number < 100000) return (number / 1000).toFixed(2).toString() + " K";
  if (number < 100000000)
    return (number / 1000000).toFixed(2).toString() + " M";
  if (number < 100000000000)
    return (number / 1000000000).toFixed(2).toString() + " B";
  return (number / 1000000000000).toFixed(2).toString() + " T";
}
