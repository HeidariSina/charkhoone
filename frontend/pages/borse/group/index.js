import Layout from "../../../components/borse/layout";
import Header from "../../../components/borse/header";
import Card from "../../../components/borse/group/card";
import Footer from "../../../components/borse/footer";
import style from "../../../styles/borse/group/group.module.css";
import { API_URL } from "../../../config";

export default function Home({ data }) {
  return (
    <Layout title="صفحه گروه های بورسی">
      <p className={style.text}>گروه های تابلو بورس</p>
      <div className={style.cards}>
        {data.map((dat, index) => {
          if (dat.attributes.group != "98")
            return (
              <Card
                name={dat.attributes.name}
                group={dat.attributes.group}
                key={index}
              />
            );
        })}
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  const res = await fetch(
    `${API_URL}/api/groups?pagination[page]=1&pagination[pageSize]=100&sort=group:ASC`
  );
  const groups = await res.json();
  return {
    props: { data: groups.data },
  };
}
