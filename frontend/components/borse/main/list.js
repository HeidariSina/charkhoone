import style from "../../../styles/borse/main/list.module.css";
import Link from "next/link";
export default function list({ data, title }) {
  return (
    <div className={style.main}>
      <p className={style.head}>{title}</p>
      <table className={style.table}>
        <tbody>
          <tr style={{ height: 3 + "rem" }}>
            <th className={style.hd3}>ارزش</th>
            <th className={style.hd3}>حجم</th>
            <th className={style.hd3}>تعداد</th>
            <th className={style.hd1}>قیمت دیروز</th>
            <th className={style.hd2}>بازه روز</th>
            <th className={style.hd4}>آخرین معامله</th>
            <th>قیمت پایانی</th>
            <th>نام</th>
          </tr>
          {data.tradeTop.map((el, index) => {
            return (
              <tr className={style.tr} key={index}>
                <td className={style.left + " " + style.hd3}>
                  {mobadel(el.qTotCap)}
                </td>
                <td className={style.left + " " + style.hd3}>
                  {mobadel(el.qTotTran5J)}
                </td>
                <td className={style.left}>{el.zTotTran}</td>
                <td className={style.left + " " + style.hd1}>
                  {" "}
                  {mobadel(el.priceYesterday)}
                </td>
                <td className={style.left + " " + style.hd2}>
                  {mobadel(el.priceMin) +
                    " " +
                    "-" +
                    " " +
                    mobadel(el.priceMax)}
                </td>
                <td className={style.left + " " + style.hd4}>
                  {mobadel(el.pDrCotVal)}
                </td>
                <td className={style.left}>
                  <span
                    style={
                      el.priceChange < 0
                        ? { color: "#e8383b" }
                        : { color: "#56d62f" }
                    }
                  >
                    ({el.priceChange})
                  </span>
                  {" " + mobadel(el.pClosing)}
                </td>
                <td className={style.right}>
                  <Link href={`/borse/${el.instrument.insCode}`}>
                    {"(" +
                      el.instrument.lVal18AFC +
                      ")" +
                      " " +
                      el.instrument.lVal30}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
function mobadel(number) {
  if (number < 1000) return number;
  if (number < 1000000) return (number / 1000).toFixed(2).toString() + " K";
  if (number < 1000000000)
    return (number / 1000000).toFixed(2).toString() + " M";
  if (number < 1000000000000)
    return (number / 1000000000).toFixed(2).toString() + " B";
  return (number / 1000000000000).toFixed(2).toString() + " T";
}
