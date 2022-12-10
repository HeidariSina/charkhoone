import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import style from "../../styles/borse/layout.module.css";

export default function layout({ title, children }) {
  return (
    <div className={style.main}>
      <Head>
        <title> {title}</title>
        <meta charSet="UTF-8"></meta>
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
