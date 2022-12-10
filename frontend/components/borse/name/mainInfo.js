import style from "../../../styles/borse/name/stat.module.css";
export default function mainInfo({ maininfo, func }) {
  return (
    <div className={style.main}>
      <h1 className={style.head}>اطلاعات اصلی </h1>
      <table className={style.table}>
        <tbody key="state">
          <tr className={style.tr}>
            <td className={style.td}>{numberToTime(maininfo.time)}</td>
            <th className={style.th}>آخرین تغیرات قیمت</th>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>{func(maininfo.moamele)}</td>
            <th className={style.th}>قیمت معامله </th>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>{func(maininfo.payani)}</td>
            <th className={style.th}>قیمت پایانی</th>
          </tr>
          <tr className={style.tr}>
            <td
              className={style.td}
              style={
                maininfo.change > 0
                  ? { color: "#56d62f" }
                  : { color: "#e8383b" }
              }
            >
              {maininfo.change}
            </td>
            <th className={style.th}>تغیرات قیمت</th>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>{func(maininfo.yesterday)}</td>
            <th className={style.th}>قیمت دیروز</th>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>{func(maininfo.max)}</td>
            <th className={style.th}>بیشترین قیمت</th>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>{func(maininfo.min)}</td>
            <th className={style.th}>کمترین قیمت</th>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>{func(maininfo.first)}</td>
            <th className={style.th}>قیمت اولیه</th>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>{func(maininfo.saham)}</td>
            <th className={style.th}>تعداد سهام</th>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>{func(maininfo.volumeMabna)}</td>
            <th className={style.th}>حجم مبنا</th>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>{maininfo.vaziat}</td>
            <th className={style.th}>وضعیت</th>
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
