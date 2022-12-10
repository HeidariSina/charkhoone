const CoinGecko = require("coingecko-api");
import Layout from "../../components/crypto/layout";
import Footer from "../../components/crypto/footer";
import Header from "../../components/crypto/header";
import Cardbox from "../../components/crypto/cardbox";
import style from "../../styles/crypto/search.module.css";
import { CgSmileSad } from "react-icons/cg";

export default function search({ data, name }) {
  return (
    <Layout title={`Search for ${name}`}>
      <Header />
      {!data.length ? (
        <div className={style.notfound}>
          <div className={style.div}>
            <CgSmileSad className={style.svg} />
            <p className={style.parag}>Sorry... Founds No Crypto</p>
          </div>
        </div>
      ) : (
        <div className={style.main}>
          {data.map((e) => (
            <Cardbox data={e} key={e.name} />
          ))}
        </div>
      )}
      <Footer />
    </Layout>
  );
}
export async function getServerSideProps({ query: { name } }) {
  const CoinGeckoClient = new CoinGecko();
  let income = await fetch(
    `https://api.coingecko.com/api/v3/search?query=${name}`
  );
  income = await income.json();
  return { props: { data: income.coins, name } };
}
