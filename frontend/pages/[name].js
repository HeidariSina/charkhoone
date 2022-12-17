import style from "../styles/borse/name/event.module.css";
import Layout from "../components//borse/layout";
import HeadTitle from "../components/borse/name/headTitle";
import MainInfo from "../components/borse/name/mainInfo";
import Table from "../components/borse/name/table";
import { API_URL, SOLO_URL } from "../config";
import Smoothchart from "../components/borse/name/smoothChart";
import Mainchart from "../components/borse/name/mainchart";
import Volume from "../components/borse/name/Volume";
import Buy from "../components/borse/name/buy";
import { useEffect, useState } from "react";
import SaraneChart from "../components/borse/name/saranechart";
import HaghighiChart from "../components/borse/name/haghighiChart";
import Router from 'next/router';

export default function Events({
  nameInfo,
  mainInformation,
  stateData,
  bestlimits,
  volume,
  buy,
  name,
  mainstate,
  haghighiAll,
}) {
  const [data, setdata] = useState([
    nameInfo,
    mainInformation,
    stateData,
    bestlimits,
    volume,
    buy,
    name,
    mainstate,
    haghighiAll,
  ]);
  useEffect(() => {
    const interval = setInterval(
      async () => setdata(await ref(data[6])),
      40 * 1000
    );
    return async () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Layout title={data[0].attributes.name}>
      <HeadTitle
        fullname={data[0].attributes.fullname}
        name={data[0].attributes.name}
        group={data[0].attributes.group}
      />
      <div className={style.main}>
        <div className={style.sec}>
          <Volume volume={data[4]} func={mobadel} />
          <div className={style.thr}>
            <div className={style.buy}>
              <Buy buy={data[5]} mobadel={mobadel} />
            </div>
            <div className={style.ch1}>
              <Mainchart data={data[7]} />
            </div>
          </div>
          <div className={style.thr}>
            <div className={style.table}>
              <Table bestlimits={data[3]} func={mobadel} />
            </div>
            <div className={style.ch2}>
              <Smoothchart data={data[2].slice(0, 10)} />
            </div>
          </div>
        </div>
        <div className={style.mainInfo}>
          <MainInfo maininfo={data[1]} func={mobadel} />
        </div>
      </div>
      <div className={style.chs}>
        <div className={style.ch}>
          <SaraneChart data={data[2]} />
        </div>
        <div className={style.ch}>
          <HaghighiChart data={data[8]} />
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps({ params: { name } }) {
  const resDB = await fetch(
    `${API_URL}/api/companies?filters[inscode]=${name}`
  );
  let nameInfo = await resDB.json();
  if(nameInfo.data.length < 1)
  {
    return {
      notFound: true
  };
  }
  else{
  try {
    const responseMainData = await fetch(
      `${API_URL}/api/maindatas?filters[inscode]=${name}`
    );
    let resMainData = await responseMainData.json();

    const responseStateData = await fetch(
      `${API_URL}/api/statedatas?filters[inscode]=${name}`
    );
    let resStateData = await responseStateData.json();

    const responseMainState = await fetch(
      `${API_URL}/api/mainstates?filters[inscode]=${name}`
    );
    let resMainState = await responseMainState.json();

    const responseBuy = await fetch(
      `${API_URL}/api/buydatas?filters[inscode]=${name}`
    );
    let resBuy = await responseBuy.json();

    const responseMabna = await fetch(
      `${API_URL}/api/mabnas?filters[inscode]=${name}`
    );
    let resMabna = await responseMabna.json();

    const responceSellData = await fetch(
      `${API_URL}/api/selldatas?filters[inscode]=${name}`
    );
    let resSellData = await responceSellData.json();

    const responceTableData= await fetch(
      `${API_URL}/api/tabledatas?filters[inscode]=${name}`
    );
    let resTableData = await responceTableData.json();
    return {
      props: {
        nameInfo: nameInfo.data[0],
        mainInformation: Object.assign(resMainData.data[0].attributes.data.mainInformation,resMabna.data[0].attributes.data.mabna),
        volume: resMainData.data[0].attributes.data.volume,
        stateData: resStateData.data[0].attributes.data.statData,
        mainstate: resMainState.data[0].attributes.data.mainStateData,
        buy: resBuy.data[0].attributes.data.buydata,
        haghighiAll: resSellData.data[0].attributes.data.sell,
        bestlimits: resTableData.data[0].attributes.data.tabledata,
        name,
      },
    };
  } catch (error) {
    let dat = await helpingAPI(name);
    return {
      props: dat,
    };
  }}
}

async function ref(name) {
  const resDB = await fetch(
    `${API_URL}/api/companies?filters[inscode]=${name}`
  );
  let nameInfo = await resDB.json();

  try {
    const responseMainData = await fetch(
      `${API_URL}/api/maindatas?filters[inscode]=${name}`
    );
    let resMainData = await responseMainData.json();

    const responseStateData = await fetch(
      `${API_URL}/api/statedatas?filters[inscode]=${name}`
    );
    let resStateData = await responseStateData.json();

    const responseMainState = await fetch(
      `${API_URL}/api/mainstates?filters[inscode]=${name}`
    );
    let resMainState = await responseMainState.json();

    const responseBuy = await fetch(
      `${API_URL}/api/buydatas?filters[inscode]=${name}`
    );
    let resBuy = await responseBuy.json();

    const responseMabna = await fetch(
      `${API_URL}/api/mabnas?filters[inscode]=${name}`
    );
    let resMabna = await responseMabna.json();

    const responceSellData = await fetch(
      `${API_URL}/api/selldatas?filters[inscode]=${name}`
    );
    let resSellData = await responceSellData.json();

    const responceTableData= await fetch(
      `${API_URL}/api/tabledatas?filters[inscode]=${name}`
    );
    let resTableData = await responceTableData.json();

    return [
      nameInfo.data[0],
      Object.assign(resMainData.data[0].attributes.data.mainInformation,resMabna.data[0].attributes.data.mabna),
      resStateData.data[0].attributes.data.statData,
      resTableData.data[0].attributes.data.tabledata,
      resMainData.data[0].attributes.data.volume,
      resBuy.data[0].attributes.data.buydata,
      name,
      resMainState.data[0].attributes.data.mainStateData,
      resSellData.data[0].attributes.data.sell,
    ];
  } catch (error) {
    let dat = await helpingAPI(name);
    return [
      nameInfo.data[0],
      dat.mainInformation,
      dat.stateData,
      dat.bestlimits,
      dat.volume,
      dat.buy,
      name,
      dat.mainstate,
    ];
  }
}

async function helpingAPI(name) {
  const helping = await fetch(`${SOLO_URL}/api/name`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: name }),
  });
  const res = helping.json();
  return {
    mainInformation: res.mainInformation,
    stateData: res.stateData,
    bestlimits: res.bestLimits,
    volume: res.volume,
    buy: res.buy,
    name,
    mainstate: res.mainstate,
  };
}
function mobadel(number) {
  if (number < 1000) return number;
  if (number < 1000000) return (number / 1000).toFixed(2).toString() + " K";
  if (number < 1000000000)
    return (number / 1000000).toFixed(2).toString() + " M";
  if (number < 1000000000000)
    return (number / 1000000000).toFixed(2).toString() + " B";
  return (number / 1000000000000).toFixed(2).toString() + " T";
}
