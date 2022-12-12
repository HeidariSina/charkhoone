import Link from "next/link";
import style from "../../../styles/borse/main/best.module.css";
export default function best1({ data, mobadel }) {
  let temp = [0, 1, 2, 3, 4];
  let len = data.length;
  return (
    <div className={style.main}>
      <table className={style.table}>
        <tbody key="best1">
          <tr style={{ height: 3 + "rem" }}>
            <th>بازه</th>
            <th>آخرین معامله</th>
            <th>قیمت پایانی</th>
            <th className={style.right}>نماد</th>
          </tr>
          {temp.map((el) => {
            return makeTable(el, len, data, mobadel);
          })}
        </tbody>
      </table>
    </div>
  );
}

function makeTable(index, len, el, mobadel) {
  if (len <= index) {
    return (
      <tr className={style.tr}>
        <td className={style.left}>-</td>
        <td className={style.left}>-</td>
        <td className={style.left}>-</td>
        <td className={style.left}>-</td>
      </tr>
    );
  } else {
    return (
      <tr className={style.tr} key={index}>
        <td className={style.left}>
          {mobadel(el[index].priceMin) +
            " " +
            "-" +
            " " +
            mobadel(el[index].priceMax)}
        </td>
        <td className={style.left}>{mobadel(el[index].pDrCotVal)}</td>
        <td className={style.left}>
          <span
            style={
              el[index].priceChange < 0
                ? { color: "#e8383b" }
                : { color: "#56d62f" }
            }
          >
            ({mobadel(el[index].priceChange)})
          </span>
          {" " + mobadel(el[index].pClosing)}
        </td>
        <td className={style.right}>
          <Link href={`/${el[index].instrument.insCode}`}>
            {"(" +
              el[index].instrument.lVal18AFC +
              ")" +
              " " +
              el[index].instrument.lVal30}
          </Link>
        </td>
      </tr>
    );
  }
}
