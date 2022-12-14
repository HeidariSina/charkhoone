import Layout from "../components/borse/layout";
import List from "../components/borse/main/list";
import { SOLO_URL, API_URL } from "../config";
import { useEffect, useState } from "react";

export default function Best2({ datas }) {
  const [data, setdata] = useState(datas);
  useEffect(() => {
    const interval = setInterval(async () => setdata(await ref()), 10 * 1000);
    return async () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Layout title={"برترین های فرابورس"}>
      <List data={data} title={"لیست برتراکنش فرا بورس "}></List>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${API_URL}/api/bestlimitsg2s`);
    let data = await response.json();
    data = data.data[0].attributes.data.dat;
    return { props: { datas: data } };
  } catch (error) {
    let dat = await helpingAPIBL(2);
    return { props: { datas: dat.data } };
  }
}

async function ref() {
  try {
    const response = await fetch(`${API_URL}/api/bestlimitsg2s`);
    let data = await response.json();
    data = data.data[0].attributes.data.dat;
    return data;
  } catch (error) {
    let dat = await helpingAPIBL(2);
    return dat.data;
  }
}

async function helpingAPIBL(number) {
  const helping = await fetch(`${SOLO_URL}/api/bl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: number }),
  });
  const res = helping.json();
  return res;
}
