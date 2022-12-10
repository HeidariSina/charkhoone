import style from "../../styles/crypto/change.module.css";
export default function change({ data }) {
  return (
    <div>
      <h1 className={style.head}>Price Changes Information</h1>
      <table className={style.table}>
        <tbody>
          <tr>
            <td className={style.td}>24h</td>
            <td className={style.td}>7d</td>
            <td className={style.td}>14d</td>
            <td className={style.td}>30d</td>
            <td className={style.td}>60d</td>
            <td className={style.td}>1y</td>
          </tr>
          <tr>
            <td
              style={
                data.price_change_percentage_24h > 0
                  ? { color: "#56d62f" }
                  : { color: "#e8383b" }
              }
            >
              {Math.round(data.price_change_percentage_24h * 10) / 10}%
            </td>
            <td
              style={
                data.price_change_percentage_7d > 0
                  ? { color: "#56d62f" }
                  : { color: "#e8383b" }
              }
            >
              {Math.round(data.price_change_percentage_7d * 10) / 10}%
            </td>
            <td
              style={
                data.price_change_percentage_14d > 0
                  ? { color: "#56d62f" }
                  : { color: "#e8383b" }
              }
            >
              {Math.round(data.price_change_percentage_14d * 10) / 10}%
            </td>
            <td
              style={
                data.price_change_percentage_30d > 0
                  ? { color: "#56d62f" }
                  : { color: "#e8383b" }
              }
            >
              {Math.round(data.price_change_percentage_30d * 10) / 10}%
            </td>
            <td
              style={
                data.price_change_percentage_60d > 0
                  ? { color: "#56d62f" }
                  : { color: "#e8383b" }
              }
            >
              {Math.round(data.price_change_percentage_60d * 10) / 10}%
            </td>
            <td
              style={
                data.price_change_percentage_1y > 0
                  ? { color: "#56d62f" }
                  : { color: "#e8383b" }
              }
            >
              {Math.round(data.price_change_percentage_1y * 10) / 10}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
