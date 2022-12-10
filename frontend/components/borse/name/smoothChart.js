import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function Smoothchart({ data }) {
  let labels = [];
  let payani = [];
  let moamele = [];
  let first = [];
  for (let temp of data) {
    payani.push(temp.payani);
    moamele.push(temp.moamele);
    first.push(temp.priceFirst);
    let temp2 = temp.time.toString();
    let len = temp2.length;
    labels.push(
      miladi_be_shamsi(
        parseInt(temp2.slice(0, len - 4)),
        parseInt(temp2.slice(len - 4, len - 2)),
        parseInt(temp2.slice(len - 2, len))
      )
    );
  }
  moamele = moamele.reverse();
  labels = labels.reverse();
  first = first.reverse();
  payani = payani.reverse();
  const datas = {
    labels: labels,
    datasets: [
      {
        label: "قیمت معامله",
        data: moamele,
        fill: false,
        backgroundColor: "rgba(231,237,66,1)",
        borderColor: "rgba(231,237,66,1)",
      },
      {
        label: "قیمت اولیه",
        data: first,
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "قیمت پایانی",
        data: payani,
        fill: false,
        backgroundColor: "rgba(245, 110, 202,1)",
        borderColor: "rgba(245, 110, 202 , 1)",
      },
    ],
  };
  return (
    <div>
      <Line
        data={datas}
        height={400}
        width={400}
        options={{
          interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
          },
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
              text: "قیمت در طول 10 روز اخیر",
              color: "#bbb",
              font: {
                size: 20,
                style: "italic",
                weight: 400,
              },
            },
          },
          scales: {
            yAxes: {
              grid: {
                drawBorder: true,
                color: "rgba(200,200,200,0.2)",
              },
              ticks: {
                beginAtZero: true,
                color: "#bbb",
                maxTicksLimit: 5,
                callback: function (label, index, labels) {
                  return mobadel(label);
                },
              },
            },
            xAxes: {
              grid: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
                color: "#ccc",
              },
            },
          },
        }}
      />
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
