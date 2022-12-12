import React from "react";
import { API_URL } from "../../config";
import Layout from "../../components/borse/layout";
import List from "../../components/borse/group/list";

export default function group({ data, group }) {
  return (
    <Layout title={`لیست گروه ${group}`}>
      <List group={group} data={data} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    `${API_URL}/api/groups?pagination[page]=1&pagination[pageSize]=100`
  );
  const Name = await res.json();
  let data = Name.data;
  const paths = data.map((evt) => ({
    params: { group: evt.attributes.group },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { group } }) {
  const data = await getOneGroupOfCompanies(group);
  return {
    props: { data, group },
  };
}

async function getOneGroupOfCompanies(number) {
  const resDB = await fetch(
    `${API_URL}/api/companies?filters[group]=${number}&pagination[page]=1&pagination[pageSize]=2000`
  );
  let source = await resDB.json();
  return source.data;
}
