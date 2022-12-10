import { Line } from "react-chartjs-2";
import moment from "moment";
import Chart from "chart.js/auto";

export default function Smoothchart({ data, label }) {
  let labels = [];
  let value = [];

  data.map((element, index) => {
    labels[index] = moment(element[0]).format("HH:mm:ss");
    value[index] = element[1];
  });
  const datas = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: value,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
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
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      y: {
        ticks: {
          color: "#bbb",
          display: true,
          callback: function (label, index, labels) {
            return mobadel(label);
          },
        },
        grid: { color: "rgba(178,178,178,0.4)" },
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
function mobadel(number) {
  if (number < 100) return number;
  if (number < 100000) return (number / 1000).toFixed(3).toString() + " K";
  if (number < 100000000)
    return (number / 1000000).toFixed(3).toString() + " M";
  if (number < 100000000000)
    return (number / 1000000000).toFixed(3).toString() + " B";
  return (number / 1000000000000).toFixed(3).toString() + " T";
}
