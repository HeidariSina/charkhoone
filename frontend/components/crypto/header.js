import SearchBar from "./searchBar";
import style from "../../styles/both/header.module.css";
import Link from "next/link";
import { FaBars, FaCoins } from "react-icons/fa";

export default function header() {
  return (
    <div className={style.div}>
      <Link href={"/"} passHref>
        <div className={style.back}>
          <FaBars />
          <p className={style.text}>Main Menu</p>
        </div>
      </Link>
      <Link href={"/crypto"} passHref>
        <div className={style.back}>
          <FaCoins />
          <p className={style.text}>CryptoCurrency Page</p>
        </div>
      </Link>
      <SearchBar />
    </div>
  );
}
