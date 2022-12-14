import SearchBar from "./searchBar";
import style from "../../styles/both/header.module.css";
import { FaBars, FaCoins, FaLayerGroup } from "react-icons/fa";

export default function header() {
  return (
    <div className={style.div}>
      <a href={"/"}>
        <div className={style.back}>
          <FaBars />
          <p className={style.text}>صفحه اصلی</p>
        </div>
      </a>
      <a href={"/group"}>
        <div className={style.back}>
          <FaLayerGroup />
          <p className={style.text}>صفحه گروه ها</p>
        </div>
      </a>
      <SearchBar />
    </div>
  );
}
