import Layout from "../../components/borse/layout";
import style from "../../styles/borse/main.module.css";
import Group1 from "../../components/borse/main/group1";
import Group2 from "../../components/borse/main/group2";
import Best from "../../components/borse/main/best";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL, SOLO_URL } from "../../config";

export default function Home({ g1, g2, g1best, g2best }) {
  const [data, setdata] = useState([g1, g2, g1best, g2best]);
  useEffect(() => {
    const interval = setInterval(async () => setdata(await ref()), 7000);
    return async () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Layout title="بورس تهران">
      <div className={style.head}>
        <div className={style.g1}>
          <p className={style.text}>بورس اوراق بهادار تهران</p>
          <Group1 g1={data[0]} mobadel={mobadel} />
          <p className={style.text}>
            <span className={style.a}>
              {" "}
              <Link href={`/borse/bestBorse`} className={style.a}>
                (لیست کامل)
              </Link>
            </span>{" "}
            نماد های برتراکنش
          </p>
          <Best data={data[2]} mobadel={mobadel} />
        </div>
        <div className={style.g2}>
          <p className={style.text}>فرابورس ایران</p>
          <Group2 g2={data[1]} mobadel={mobadel} />
          <p className={style.text}>
            <span className={style.a}>
              {" "}
              <Link href={`/borse/bestFaraBorse`} className={style.a}>
                (لیست کامل)
              </Link>
            </span>{" "}
            نماد های برتراکنش
          </p>
          <Best data={data[3]} mobadel={mobadel} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${API_URL}/api/firstpages`);
    let resData = await res.json();
    resData = resData.data[0].attributes.data;
    return {
      props: {
        g1: resData.g1,
        g2: resData.g2,
        g1best: resData.g1best,
        g2best: resData.g2best,
      },
    };
  } catch (error) {
    let dat = await helpingAPIFP();
    return {
      props: {
        g1: dat.g1,
        g2: dat.g2,
        g1best: dat.g1best,
        g2best: dat.g2best,
      },
    };
  }
}

async function ref() {
  try {
    const res = await fetch(`${API_URL}/api/firstpages`);
    let resData = await res.json();
    resData = resData.data[0].attributes.data;
    return [resData.g1, resData.g2, resData.g1best, resData.g2best];
  } catch (error) {
    let dat = await helpingAPIFP();
    return [dat.g1, dat.g2, dat.g1best, dat.g2best];
  }
}

async function helpingAPIFP() {
  const helping = await fetch(`${SOLO_URL}/api/fp`, {
    method: "GET",
  });
  const res = helping.json();
  return res;
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
