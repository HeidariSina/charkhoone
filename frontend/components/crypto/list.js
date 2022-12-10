import style from "../../styles/crypto/list.module.css";
import Link from "next/link";

export default function list({ datas }) {
  return (
    <div>
      <di>
        <h1 className={style.header}>List of Famous CryptoCurrencys </h1>
        <table className={style.pag}>
          <tbody key="form">
            <tr className={style.trr}>
              <th>#</th>
              <th className={style.td}>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th className={style.hiddenscd}>Total Volume</th>
              <th className={style.hiddenfirst}>MarketCap</th>
              <th>Price Change</th>
              <th className={style.hiddenfirst}>MarketCap Change</th>
              <th className={style.hiddenscd}>High 24h</th>
              <th className={style.hiddenscd}>Low 24h</th>
            </tr>
            {datas.map((data, index) => (
              <tr className={style.trr} key={data.symbol}>
                <td className={style.para}>{index + 1}</td>
                <td>
                  <Link href={`/crypto/${data.id}`} passHref>
                    <div className={style.scd}>
                      <img src={data.image} className={style.img} />
                      <p>{data.name}</p>
                    </div>
                  </Link>
                </td>
                <td>{data.symbol}</td>
                <td>${Math.round(data.current_price * 100000) / 100000}</td>
                <td className={style.hiddenscd}>
                  ${addcomaa(data.total_volume)}
                </td>
                <td className={style.hiddenfirst}>
                  ${addcomaa(data.market_cap)}
                </td>
                <td
                  style={
                    data.price_change_percentage_24h > 0
                      ? { color: "#56d62f" }
                      : { color: "#e8383b" }
                  }
                >
                  {Math.round(data.price_change_percentage_24h * 100) / 100} %
                </td>
                <td
                  className={style.hiddenfirst}
                  style={
                    data.market_cap_change_percentage_24h > 0
                      ? { color: "#56d62f" }
                      : { color: "#e8383b" }
                  }
                >
                  {Math.round(data.market_cap_change_percentage_24h * 100) /
                    100}{" "}
                  %
                </td>
                <td className={style.hiddenscd}>
                  ${Math.round(data.high_24h * 100000) / 100000}
                </td>
                <td className={style.hiddenscd}>
                  ${Math.round(data.low_24h * 100000) / 100000}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </di>
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
