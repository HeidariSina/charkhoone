import style from "../../../styles/borse/name/buy.module.css";
export default function buy({ buy, mobadel }) {
  return (
    <div className={style.main}>
      <table className={style.table}>
        <tbody key={`buy`}>
          <tr style={{ height: 3 + "rem" }}>
            <th>فروش</th>
            <th>خرید</th>
            <th>حجم</th>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>
              {buy.sellIVolume == "" ? "-" : mobadel(buy.sellIVolume)}
            </td>
            <td className={style.td}>
              {buy.buyIVolume == "" ? "-" : mobadel(buy.buyIVolume)}
            </td>
            <th>حقیقی</th>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>
              {buy.sellNVolume == "" ? "-" : mobadel(buy.sellNVolume)}
            </td>
            <td className={style.td}>
              {buy.buyNVolume == "" ? "-" : mobadel(buy.buyNVolume)}
            </td>
            <th>حقوقی</th>
          </tr>
          <tr className={style.tr}>
            <th>فروش</th>
            <th>خرید</th>
            <th>تعداد</th>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>
              {buy.sellICount == "" ? "-" : mobadel(buy.sellICount)}
            </td>
            <td className={style.td}>
              {buy.buyICount == "" ? "-" : mobadel(buy.buyICount)}
            </td>
            <th>حقیقی</th>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>
              {buy.sellNCount == "" ? "-" : mobadel(buy.sellNCount)}
            </td>
            <td className={style.td}>
              {buy.buyNCount == "" ? "-" : mobadel(buy.buyNCount)}
            </td>
            <th>حقوقی</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
