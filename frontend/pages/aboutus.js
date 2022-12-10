import Layout from "../components/crypto/layout";
import style from "../styles/aboutus.module.css";
import Link from "next/link";
import { FaBars, FaCoins } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

export default function aboutus() {
  return (
    <Layout title={"About Us"}>
      <div>
        <div className={style.div}>
          <Link href={"/crypto"} passHref>
            <div className={style.back}>
              <FaCoins />
              <p className={style.text}>CryptoCurrency Page</p>
            </div>
          </Link>
          <Link href={"/"} passHref>
            <div className={style.back}>
              <FaBars />
              <p className={style.text}>Main Menu</p>
            </div>
          </Link>
          <Link href={"/borse"} passHref>
            <div className={style.back}>
              <GiMoneyStack />
              <p className={style.text}>Borse Teharn Page</p>
            </div>
          </Link>
        </div>
        <div className={style.parag1}>
          <h1 className={style.h1}>درباره ی ما</h1>
          <p>
            این وبسایت با تلاش دانشجویان دانشگاه امیر کبیر ساخته شده است و برای
            کمک برای دسترسی بهتر به بورس تهران و بازار رمز ارز ها ساخته شده است{" "}
          </p>
          <p>
            قیمت ها و آمار های این وبسایت از منبع اصلی گرفته شده اند و واقعی
            هستند و همیشه نیز به روز هستند
          </p>
          <p>
            افرادی که در ساخت این پروژه شرکت داشته اند : دکتر امیر جهانشاهی ,
            سینا حیدری و زهرا عربی{" "}
          </p>
          <p>برای تماس با ما میتوانید به ایمیل های زیر پیام بدهید</p>
          <p>Amir.Jahanshahi@aut.ac.ir : ایمیل دکتر جهانشاهی</p>
          <p>Sinaheidari2000@outlook.com : ایمیل سینا حیدری</p>
        </div>
        <div className={style.parag2}>
          <h1 className={style.h1}>About Us</h1>
          <p>
            {" "}
            This website developed by Amirkabir University of Technology
            students for esay access to Tehran Stock Exchange and
            CryptoCurrencys Market
          </p>
          <p>
            The prices and statistics in this website are real and always up to
            date
          </p>
          <p>
            The People that dveloped this website are : Dr.Amir Jahanshahi ,
            Sina Heidari and Zahra Arabi
          </p>
          <p>For contact us you can send E-mail to the following mails</p>
          <p>Dr.Jahanshahi : Amir.Jahanshahi@aut.ac.ir</p>
          <p>Sina Heidari : Sinaheidari2000@outlook.com</p>
        </div>
      </div>
    </Layout>
  );
}
