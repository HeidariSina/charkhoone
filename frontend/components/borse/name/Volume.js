import style from "../../../styles/borse/name/volume.module.css";
export default function Volume({ volume, func }) {
  return (
    <div className={style.main}>
      <table className={style.table}>
        <tbody key="volume">
          <tr className={style.tr}>
            <td className={style.td}>{func(volume.value)}</td>
            <th className={style.td}>ارزش معاملات</th>
            <td className={style.td}>{func(volume.volume)}</td>
            <th className={style.td}>حجم معاملات</th>
            <td className={style.td}>{func(volume.number)}</td>
            <th className={style.td}>تعداد معاملات</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
