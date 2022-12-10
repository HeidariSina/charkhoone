import style from "../../styles/crypto/top.module.css";

export default function Top({ data }) {
  return (
    <div>
      <div className={style.name}>
        <img src={data.image} className={style.img} alt={data.name} />
        <h1>{data.name}</h1>
        <p className={style.p}>({data.symbol})</p>
      </div>
      <div className={style.tables}>
        <table className={style.table}>
          <tbody key={"firstchild"}>
            <tr className={style.tr}>
              <td className={style.left}>Current Price</td>
              <td className={style.right}>${data.current_price}</td>
            </tr>
            <tr className={style.tr}>
              <td className={style.left}>Total Volume</td>
              <td className={style.right}>${addcomaa(data.total_volume)}</td>
            </tr>
            <tr className={style.tr}>
              <td className={style.left}>Market Cap</td>
              <td className={style.right}>${addcomaa(data.market_cap)}</td>
            </tr>
          </tbody>
        </table>
        <table className={style.table}>
          <tbody key={"secondchild"}>
            <tr className={style.tr}>
              <td className={style.left}>Circulating Supply</td>
              <td className={style.right}>
                {data.circulating_supply == null ? (
                  <p>&infin;</p>
                ) : (
                  data.circulating_supply
                )}
              </td>
            </tr>
            <tr className={style.tr}>
              <td className={style.left}>Total Supply</td>
              <td className={style.right}>
                {data.total_supply == null ? <p>&infin;</p> : data.total_supply}
              </td>
            </tr>
            <tr className={style.tr}>
              <td className={style.left}>Max Supply</td>
              <td className={style.right}>
                {data.max_supply == null ? <p>&infin;</p> : data.max_supply}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
