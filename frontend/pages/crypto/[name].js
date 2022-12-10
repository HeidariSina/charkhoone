const CoinGecko = require("coingecko-api");
import Layout from "../../components/crypto/layout";
import Footer from "../../components/crypto/footer";
import Top from "../../components/crypto/top";
import Header from "../../components/crypto/header";
import Change from "../../components/crypto/change";
import Static from "../../components/crypto/static";
import Chart from "../../components/crypto/chart";
import { useEffect, useState } from "react";
import style from "../../styles/crypto/name.module.css";

export default function Event({ data1, change, chart, data2 }) {
  const [data, setdata] = useState([data1, change, chart, data2]);
  useEffect(() => {
    const interval = setInterval(
      async () => setdata(await refresher(data[0].id)),
      30000
    );
    return async () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Layout title={data1.name}>
      <Header />
      <Top data={data[0]} />
      <Change data={data[1]} />
      <div className={style.div}>
        <div className={style.div2}>
          <div className={style.ch}>
            <Chart data={data[2]["chart_prices"]} label="Prices" />
          </div>
          <div className={style.ch}>
            <Chart data={data[2]["chart_market_caps"]} label="Market Caps" />
          </div>
        </div>
        <div className={style.state}>
          <Static data={data[3]} className={style.state} />
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
export async function getStaticPaths() {
  const CoinGeckoClient = new CoinGecko();
  let datas = await CoinGeckoClient.coins.list();
  datas = datas.data;
  const paths = datas.map((evt) => ({
    params: { name: evt.id.toLowerCase() },
  }));
  return { paths, fallback: false };
}
export async function getStaticProps({ params: { name } }) {
  const CoinGeckoClient = new CoinGecko();
  let income = await CoinGeckoClient.coins.fetch(name, {
    localization: false,
    developer_data: false,
    community_data: false,
    tickers: false,
  });
  let incomechart = await CoinGeckoClient.coins.fetchMarketChart(name);
  let data1 = {};
  let change = {};
  let chart = {};
  let data2 = {};
  data1["id"] = income.data.id;
  data1["symbol"] = income.data.symbol;
  data1["name"] = income.data.name;
  data1["image"] = income.data.image.small;
  data1["total_volume"] = income.data.market_data.total_volume["usd"];
  data1["market_cap"] = income.data.market_data.market_cap["usd"];
  data1["total_supply"] = income.data.market_data.total_supply;
  data1["max_supply"] = income.data.market_data.max_supply;
  data1["circulating_supply"] = income.data.market_data.circulating_supply;
  data1["current_price"] = income.data.market_data.current_price["usd"];
  data2["symbol"] = income.data.symbol;
  data2["ath"] = income.data.market_data.ath["usd"];
  data2["atl"] = income.data.market_data.atl["usd"];
  data2["market_cap_change_percentage_24h"] =
    income.data.market_data.market_cap_change_percentage_24h;
  data2["current_price"] = income.data.market_data.current_price["usd"];
  data2["high_24h"] = income.data.market_data.high_24h["usd"];
  data2["low_24h"] = income.data.market_data.low_24h["usd"];
  data2["market_cap_rank"] = income.data.market_cap_rank;
  data2["price_change_24h"] = income.data.market_data.price_change_24h;
  data2["total_volume"] = income.data.market_data.total_volume["usd"];
  data2["market_cap"] = income.data.market_data.market_cap["usd"];
  let len = incomechart.data.prices.length;
  chart["chart_prices"] = incomechart.data.prices.slice(len / 1.15);
  chart["chart_market_caps"] = incomechart.data.market_caps.slice(len / 1.15);
  change["price_change_percentage_24h"] =
    income.data.market_data.price_change_percentage_24h;
  change["price_change_percentage_7d"] =
    income.data.market_data.price_change_percentage_7d;
  change["price_change_percentage_14d"] =
    income.data.market_data.price_change_percentage_14d;
  change["price_change_percentage_30d"] =
    income.data.market_data.price_change_percentage_30d;
  change["price_change_percentage_60d"] =
    income.data.market_data.price_change_percentage_60d;
  change["price_change_percentage_1y"] =
    income.data.market_data.price_change_percentage_1y;
  return {
    props: { data1, change, chart, data2 },
    revalidate: 30,
  };
}
async function refresher(name) {
  const CoinGeckoClient = new CoinGecko();
  let income = await CoinGeckoClient.coins.fetch(name, {
    localization: false,
    developer_data: false,
    community_data: false,
    tickers: false,
  });
  let incomechart = await CoinGeckoClient.coins.fetchMarketChart(name);
  let data1 = {};
  let change = {};
  let chart = {};
  let data2 = {};
  data1["id"] = income.data.id;
  data1["symbol"] = income.data.symbol;
  data1["name"] = income.data.name;
  data1["image"] = income.data.image.small;
  data1["total_volume"] = income.data.market_data.total_volume["usd"];
  data1["market_cap"] = income.data.market_data.market_cap["usd"];
  data1["total_supply"] = income.data.market_data.total_supply;
  data1["max_supply"] = income.data.market_data.max_supply;
  data1["circulating_supply"] = income.data.market_data.circulating_supply;
  data1["current_price"] = income.data.market_data.current_price["usd"];
  data2["symbol"] = income.data.symbol;
  data2["ath"] = income.data.market_data.ath["usd"];
  data2["atl"] = income.data.market_data.atl["usd"];
  data2["market_cap_change_percentage_24h"] =
    income.data.market_data.market_cap_change_percentage_24h;
  data2["current_price"] = income.data.market_data.current_price["usd"];
  data2["high_24h"] = income.data.market_data.high_24h["usd"];
  data2["low_24h"] = income.data.market_data.low_24h["usd"];
  data2["market_cap_rank"] = income.data.market_cap_rank;
  data2["price_change_24h"] = income.data.market_data.price_change_24h;
  data2["total_volume"] = income.data.market_data.total_volume["usd"];
  data2["market_cap"] = income.data.market_data.market_cap["usd"];
  let len = incomechart.data.prices.length;
  chart["chart_prices"] = incomechart.data.prices.slice(len / 1.15);
  chart["chart_market_caps"] = incomechart.data.market_caps.slice(len / 1.15);
  change["price_change_percentage_24h"] =
    income.data.market_data.price_change_percentage_24h;
  change["price_change_percentage_7d"] =
    income.data.market_data.price_change_percentage_7d;
  change["price_change_percentage_14d"] =
    income.data.market_data.price_change_percentage_14d;
  change["price_change_percentage_30d"] =
    income.data.market_data.price_change_percentage_30d;
  change["price_change_percentage_60d"] =
    income.data.market_data.price_change_percentage_60d;
  change["price_change_percentage_1y"] =
    income.data.market_data.price_change_percentage_1y;
  return [data1, change, chart, data2];
}
