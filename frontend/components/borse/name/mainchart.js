import React from "react";
import { Line } from "react-chartjs-2";

export default function mainchart({ data }) {
  let vol = [];
  let value = [];
  let labels = [];
  for (let i of data) {
    vol.push(i.qTitTran);
    value.push(i.pTran);
    labels.push(numberToTime(i.hEven));
  }
  const datas = {
    labels: labels,
    datasets: [
      {
        label: "قیمت",
        yAxisID: "B",
        data: value,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,1)",
        pointRadius: 1,
      },
      {
        type: "bar",
        label: "حجم",
        yAxisID: "A",
        data: vol,
        fill: true,
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
        text: "قیمت در طول روز",
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
      y: {
        beginAtZero: true,
        ticks: { display: false },
        grid: { display: false },
      },
      A: {
        type: "linear",
        position: "left",
        ticks: {
          display: false,
        },
        stack: "demo",
      },
      B: {
        position: "left",
        stackWeight: 7,
        grid: { color: "rgba(178,178,178,0.4)" },
        ticks: {
          color: "#bbb",
          maxTicksLimit: 6,
          callback: function (label, index, labels) {
            return mobadel(label);
          },
        },
        stack: "demo",
        offset: true,
      },
      xAxes: {
        grid: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          color: "#bbb",
        },
      },
    },
  };
  return <Line data={datas} options={options} />;
}
function numberToTime(number) {
  let s = number.toString();
  let len = s.length;
  let r =
    s.slice(0, len - 4) +
    ":" +
    s.slice(len - 4, len - 2) +
    ":" +
    s.slice(len - 2, len);
  return r;
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
