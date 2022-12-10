import SearchBar from "./searchBar";
import style from "../../styles/both/header.module.css";
import Link from "next/link";
import { FaBars, FaCoins, FaLayerGroup } from "react-icons/fa";

export default function header() {
  return (
    <div className={style.div}>
      <Link href={"/"}>
        <div className={style.back}>
          <FaBars />
          <p className={style.text}>صفحه اصلی</p>
        </div>
      </Link>
      <Link href={"/borse"}>
        <div className={style.back}>
          <FaCoins />
          <p className={style.text}>صفحه بورس</p>
        </div>
      </Link>
      <Link href={"/borse/group"}>
        <div className={style.back}>
          <FaLayerGroup />
          <p className={style.text}>صفحه گروه ها</p>
        </div>
      </Link>
      <SearchBar />
    </div>
  );
}
