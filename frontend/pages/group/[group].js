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
export async function getServerSideProps({ params: { group } }) {
  const resDB = await fetch(
    `${API_URL}/api/companies?filters[group]=${group}&pagination[page]=1&pagination[pageSize]=2000`
  );
  let source = await resDB.json();
  if(source.data.length < 1)
  {
    return {
      notFound: true
  };
  }
  else{
  return {
    props: { data : source.data, group },
  };}
}
