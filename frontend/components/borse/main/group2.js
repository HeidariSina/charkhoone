import React from "react";
import style from "../../../styles/borse/main/g2.module.css";

export default function group2({ g2, mobadel }) {
  let temp2 = g2.date.toString();
  let len = temp2.length;
  let time = numberToTime(g2.time);
  let date = miladi_be_shamsi(
    parseInt(temp2.slice(0, len - 4)),
    parseInt(temp2.slice(len - 4, len - 2)),
    parseInt(temp2.slice(len - 2, len))
  );
  return (
    <div className={style.main}>
      <table className={style.table}>
        <tbody key="g2">
          <tr style={{ height: 3 + "rem" }}>
            <td
              className={style.left}
              style={
                g2.shakhesChange < 0
                  ? { color: "#e8383b" }
                  : { color: "#56d62f" }
              }
            >
              {g2.shakhesChange}
            </td>
            <td className={style.right}>تغیرات شاخص کل</td>
            <td className={style.left}>{mobadel(g2.shakhes)}</td>
            <td className={style.right}>شاخص کل</td>
          </tr>
          <tr className={style.tr}>
            <td className={style.left}>{mobadel(g2.bazar1and2Value)}</td>
            <td className={style.right}> ارزش دو بازار</td>
            <td className={style.left}>{mobadel(g2.baceValue)}</td>
            <td className={style.right}>ارزش بازار پایه</td>
          </tr>
          <tr className={style.tr}>
            <td className={style.left}>{mobadel(g2.number)}</td>
            <td className={style.right}>تعداد معاملات</td>
            <td className={style.left}>{mobadel(g2.moamelatValue)}</td>
            <td className={style.right}>ارزش معاملات</td>
          </tr>
          <tr className={style.tr}>
            <td className={style.left}>{date}</td>
            <td className={style.right}>روز قیمت</td>

            <td className={style.left}>{mobadel(g2.volume)}</td>
            <td className={style.right}>حجم معاملات</td>
          </tr>
          <tr className={style.tr}>
            <td className={style.left}>{time}</td>
            <td className={style.right}>ساعت قیمت</td>
            <td
              className={style.left}
              style={
                g2.status == "بسته"
                  ? { color: "#e8383b" }
                  : { color: "#56d62f" }
              }
            >
              {g2.status}
            </td>
            <td className={style.right}>وضعیت</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
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
