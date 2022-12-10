import style from "../../styles/crypto/info.module.css";

export default function mainSection({ datas }) {
  let data = datas.data;
  let key = Object.keys(data.market_cap_percentage);
  let value = Object.values(data.market_cap_percentage);
  return (
    <div className={style.main}>
      <h1 className={style.head}>Market Information</h1>
      <div>
        <p>Total Active CryptoCurrency are {data.active_cryptocurrencies}</p>
      </div>
      <div>
        <p>
          Market Change in 24h is{" "}
          <span
            style={
              data.market_cap_change_percentage_24h_usd > 0
                ? { color: "#56d62f" }
                : { color: "#e8383b" }
            }
          >
            {Math.round(data.market_cap_change_percentage_24h_usd * 100) / 100}%
          </span>
        </p>
      </div>
      <div>
        <p>
          First Place in Market is {key[0]} with Value of{" "}
          {Math.round(value[0] * 100) / 100}%
        </p>
      </div>
      <div>
        <p>
          Second Place in Market is {key[1]} with Value of{" "}
          {Math.round(value[1] * 100) / 100}%
        </p>
      </div>
      <div>
        <p>
          Third Place in Market is {key[0]} with Value of{" "}
          {Math.round(value[2] * 100) / 100}%
        </p>
      </div>
    </div>
  );
}
