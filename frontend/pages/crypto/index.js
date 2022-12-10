import Footer from "../../components/crypto/footer";
import List from "../../components/crypto/list";
import Info from "../../components/crypto/info";
import Layout from "../../components/crypto/layout";
import Header from "../../components/crypto/header";
import { useEffect, useState } from "react";
const CoinGecko = require("coingecko-api");
export default function Index({ datas, alldata }) {
  const [data, setdata] = useState([datas, alldata]);
  useEffect(() => {
    const interval = setInterval(async () => setdata(await refresher()), 30000);
    return async () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Layout title={"CryptoCurrency"}>
      <Header />
      <Info datas={data[1]} />
      <List datas={data[0]} />
      <Footer />
    </Layout>
  );
}

export async function getStaticProps() {
  const CoinGeckoClient = new CoinGecko();
  let income = await CoinGeckoClient.coins.all({
    page: 1,
    per_page: 50,
    localization: false,
    sparkline: false,
  });
  let datas = [];
  income.data.map((ele) => {
    let obj = {};
    obj["id"] = ele.id;
    obj["symbol"] = ele.symbol;
    obj["name"] = ele.name;
    obj["image"] = ele.image.small;
    obj["current_price"] = ele.market_data.current_price["usd"];
    obj["total_volume"] = ele.market_data.total_volume["usd"];
    obj["market_cap"] = ele.market_data.market_cap["usd"];
    obj["price_change_percentage_24h"] =
      ele.market_data.price_change_percentage_24h;
    obj["market_cap_change_percentage_24h"] =
      ele.market_data.market_cap_change_percentage_24h;
    obj["high_24h"] = ele.market_data.high_24h["usd"];
    obj["low_24h"] = ele.market_data.low_24h["usd"];
    datas.push(obj);
  });
  let alldata = await CoinGeckoClient.global();
  alldata = alldata.data;

  return {
    props: { datas, alldata },
    revalidate: 30,
  };
}
async function refresher() {
  const CoinGeckoClient = new CoinGecko();
  let income = await CoinGeckoClient.coins.all({
    page: 1,
    per_page: 50,
    localization: false,
    sparkline: false,
  });
  let datas = [];
  income.data.map((ele) => {
    let obj = {};
    obj["id"] = ele.id;
    obj["symbol"] = ele.symbol;
    obj["name"] = ele.name;
    obj["image"] = ele.image.small;
    obj["current_price"] = ele.market_data.current_price["usd"];
    obj["total_volume"] = ele.market_data.total_volume["usd"];
    obj["market_cap"] = ele.market_data.market_cap["usd"];
    obj["price_change_percentage_24h"] =
      ele.market_data.price_change_percentage_24h;
    obj["market_cap_change_percentage_24h"] =
      ele.market_data.market_cap_change_percentage_24h;
    obj["high_24h"] = ele.market_data.high_24h["usd"];
    obj["low_24h"] = ele.market_data.low_24h["usd"];
    datas.push(obj);
  });
  let alldata = await CoinGeckoClient.global();
  alldata = alldata.data;
  return [datas, alldata];
}
