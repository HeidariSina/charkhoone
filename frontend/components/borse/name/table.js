import style from "../../../styles/borse/name/table.module.css";

export default function table({ bestlimits, func }) {
  let temp = [0, 1, 2, 3, 4];
  let len = bestlimits.length;
  return (
    <div className={style.main}>
      <table className={style.table}>
        <tbody key="tabel">
          <tr style={{ height: 4 + "rem" }}>
            <th>تعداد</th>
            <th>حجم</th>
            <th>فروش</th>
            <th>خرید</th>
            <th>حجم</th>
            <th>تعداد</th>
          </tr>
          {temp.map((el) => {
            return makeTable(el, len, bestlimits, func);
          })}
        </tbody>
      </table>
    </div>
  );
}
function makeTable(index, len, limits, func) {
  if (len <= index) {
    return (
      <tr className={style.tr}>
        <td className={style.td}>-</td>
        <td className={style.td}>-</td>
        <td className={style.td}>-</td>
        <td className={style.td}>-</td>
        <td className={style.td}>-</td>
        <td className={style.td}>-</td>
      </tr>
    );
  } else {
    return (
      <tr key={limits[index].number} className={style.tr}>
        <td className={style.td}>
          {limits[index].zOrdMeOf == 0 ? "-" : limits[index].zOrdMeOf}
        </td>
        <td className={style.td}>
          {limits[index].qTitMeOf == 0 ? "-" : func(limits[index].qTitMeOf)}
        </td>
        <td className={style.td}>
          {limits[index].pMeOf == 0 ? "-" : func(limits[index].pMeOf)}
        </td>
        <td className={style.td}>
          {limits[index].pMeDem == 0 ? "-" : func(limits[index].pMeDem)}
        </td>
        <td className={style.td}>
          {limits[index].qTitMeDem == 0 ? "-" : func(limits[index].qTitMeDem)}
        </td>
        <td className={style.td}>
          {limits[index].zOrdMeDem == 0 ? "-" : limits[index].zOrdMeDem}
        </td>
      </tr>
    );
  }
}
