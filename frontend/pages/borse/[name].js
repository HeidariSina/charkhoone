import style from "../../styles/borse/name/event.module.css";
import Layout from "../../components//borse/layout";
import HeadTitle from "../../components/borse/name/headTitle";
import MainInfo from "../../components/borse/name/mainInfo";
import Table from "../../components/borse/name/table";
import { API_URL, SOLO_URL } from "../../config";
import Smoothchart from "../../components/borse/name/smoothChart";
import Mainchart from "../../components/borse/name/mainchart";
import Volume from "../../components/borse/name/Volume";
import Buy from "../../components/borse/name/buy";
import { useEffect, useState } from "react";
import SaraneChart from "../../components/borse/name/saranechart";
import HaghighiChart from "../../components/borse/name/haghighiChart";
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
export async function getStaticPaths() {
  const resDB = await fetch(
    `${API_URL}/api/companies?pagination[page]=1&pagination[pageSize]=2000`
  );
  let source = await resDB.json();
  let res = source.data;
  let paths = res.map((evt) => ({
    params: { name: evt.attributes.inscode },
  }));
  if (res.length == 0) {
    paths = null;
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { name } }) {
  const resDB = await fetch(
    `${API_URL}/api/companies?filters[inscode]=${name}`
  );
  let nameInfo = await resDB.json();
  try {
    const response = await fetch(
      `${API_URL}/api/cmds?filters[inscode]=${name}`
    );
    let res = await response.json();
    return {
      props: {
        nameInfo: nameInfo.data[0],
        mainInformation: res.data[0].attributes.mainData.mainInformation,
        stateData: res.data[0].attributes.mainData.stateData,
        bestlimits: res.data[0].attributes.mainData.bestLimits,
        volume: res.data[0].attributes.mainData.volume,
        buy: res.data[0].attributes.mainData.buy,
        name,
        mainstate: res.data[0].attributes.mainData.mainstate,
        haghighiAll: res.data[0].attributes.mainData.haghighiAll,
      },
    };
  } catch (error) {
    let dat = await helpingAPI(name);
    return {
      props: dat,
    };
  }
}

async function ref(name) {
  const resDB = await fetch(
    `${API_URL}/api/companies?filters[inscode]=${name}`
  );
  let nameInfo = await resDB.json();

  try {
    const response = await fetch(
      `${API_URL}/api/cmds?filters[inscode]=${name}`
    );
    let res = await response.json();
    return [
      nameInfo.data[0],
      res.data[0].attributes.mainData.mainInformation,
      res.data[0].attributes.mainData.stateData,
      res.data[0].attributes.mainData.bestLimits,
      res.data[0].attributes.mainData.volume,
      res.data[0].attributes.mainData.buy,
      name,
      res.data[0].attributes.mainData.mainstate,
      res.data[0].attributes.mainData.haghighiAll,
      1,
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
