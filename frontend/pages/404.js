import styles from "../styles/404.module.css";
import { FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";
import Head from "next/head";
export default function notfound() {
  return (
    <div>
      <Head>
        <title>404</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.sec}>
          <h1 className={styles.maintext}>
            <FaExclamationCircle />
            &#160; Your Page is Not Found
          </h1>
          <div className={styles.third}>
            <h2 className={styles.sectext}>
              <Link href={"/"}>&rarr; Back to Main Page</Link>
            </h2>
            <h2 className={styles.sectext}>
              <Link href={"/crypto"}>&rarr; Back to CryptoCurrencys Page</Link>
            </h2>
            <h2 className={styles.sectext}>
              <Link href={"/borse"}>&rarr; Back to Borse Page</Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
