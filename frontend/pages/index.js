import style from "../styles/Home.module.css";
import Link from "next/link";
import Head from "next/head";

export default function index({ content }) {
  return (
    <div>
      <Head>
        <title> {"چارخونه"}</title>
        <meta name="description" content={content}></meta>
        <meta charSet="UTF-8"></meta>
      </Head>
      <div className={style.main}>
        <Link href={"/crypto"}>
          <div className={style.card}>
            <img className={style.img} src={"/static/Crypto.webp"} />
            <p className={style.p}>رمز ارز</p>
          </div>
        </Link>
        <Link href={"/borse"}>
          <div className={style.card}>
            <img className={style.img} src={"/static/borse.webp"} />
            <p className={style.p}>بورس تهران</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
