import Layout from "../components/borse/layout";
import Card from "../components/borse/search/card";
import { API_URL } from "../config";
import style from "../styles/borse/search/card.module.css";
import { FaFrown } from "react-icons/fa";

export default function search({ name, data }) {
  return (
    <Layout title={`جستجو برای ${name}`}>
      {data.length == 0 ? (
        <div className={style.div}>
          <FaFrown className={style.icon} />
          <p className={style.p}>
            اطلاعاتی در مورد شرکت وارد شده پیدا نشده است
          </p>
        </div>
      ) : (
        <div className={style.main}>
          {data.map((el) => {
            return <Card data={el} key={el.attributes.inscode} />;
          })}
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query: { name } }) {
  let res1 = await fetch(
    `${API_URL}/api/companies?filters[fullname][$contains]=${name}&pagination[page]=1&pagination[pageSize]=100`
  );
  let data1 = await res1.json();
  let res2 = await fetch(
    `${API_URL}/api/companies?filters[name][$contains]=${name}&pagination[page]=1&pagination[pageSize]=100`
  );
  let data2 = await res2.json();
  let data = parse(data1.data, data2.data);
  return { props: { data, name } };
}

function parse(data1, data2) {
  let data = [];
  for (let i of data1) {
    data.push(i);
  }
  for (let i of data2) {
    let obj = data.findIndex((el) => el.id == i.id);
    if (obj == -1) {
      data.push(i);
    }
  }
  return data;
}
