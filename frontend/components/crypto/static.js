import style from "../../styles/crypto/state.module.css";
export default function statictable({ data }) {
  return (
    <div className={style.main}>
      <h1 className={style.head}>
        {data.symbol.toUpperCase()} Price Statistics
      </h1>
      <table className={style.table}>
        <tbody key="stat">
          <tr className={style.tr}>
            <th className={style.th}>Rank</th>
            <td className={style.td}>#{data.market_cap_rank}</td>
          </tr>
          <tr className={style.tr}>
            <th className={style.th}>Price</th>
            <td className={style.td}>${data.current_price}</td>
          </tr>
          <tr className={style.tr}>
            <th className={style.th}>Market Cap</th>
            <td className={style.td}>${addcomaa(data.market_cap)}</td>
          </tr>
          <tr className={style.tr}>
            <th className={style.th}>Market Cap Change 24h</th>
            <td
              className={style.td}
              style={
                data.market_cap_change_percentage_24h > 0
                  ? { color: "#56d62f" }
                  : { color: "#e8383b" }
              }
            >
              %{Math.round(data.market_cap_change_percentage_24h * 100) / 100}
            </td>
          </tr>
          <tr className={style.tr}>
            <th className={style.th}>Price Change in 24h</th>
            <td
              className={style.td}
              style={
                data.price_change_24h > 0
                  ? { color: "#56d62f" }
                  : { color: "#e8383b" }
              }
            >
              ${Math.round(data.price_change_24h * 100000) / 100000}
            </td>
          </tr>
          <tr className={style.tr}>
            <th className={style.th}>Total Volume</th>
            <td className={style.td}>${addcomaa(data.total_volume)}</td>
          </tr>
          <tr className={style.tr}>
            <th className={style.th}>24h High / 24h Low</th>
            <td className={style.td}>
              ${Math.round(data.high_24h * 100000) / 100000} / $
              {Math.round(data.low_24h * 100000) / 100000}
            </td>
          </tr>
          <tr className={style.tr}>
            <th className={style.th}>All-Time High</th>
            <td className={style.td}>
              $
              {data.ath < 0.00001
                ? "<0.00001"
                : Math.round(data.ath * 100000) / 100000}
            </td>
          </tr>
          <tr className={style.tr}>
            <th className={style.th}>All-Time Low</th>
            <td className={style.td}>
              $
              {data.atl < 0.00001
                ? "<0.00001"
                : Math.round(data.atl * 100000) / 100000}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
function addcomaa(a) {
  if (a < 1000) {
    return a;
  }
  let temp = a.toString();
  let len = temp.length;
  let b = "";
  while (len > 3) {
    let len2 = temp.length;
    b = "," + temp.slice(len2 - 3) + b;
    temp = temp.slice(0, len2 - 3);
    len = len - 3;
  }
  b = temp + b;
  return b;
}
