import Link from "next/link";
import style from "../../../styles/borse/search/card.module.css";

export default function card({ data }) {
  return (
    <a href={`/${data.attributes.inscode}`} className={style.card}>
      <div className={style.dd}>
        <p className={style.head}>{data.attributes.fullname}</p>
        <p>(نماد : {data.attributes.name})</p>
      </div>
    </a>
  );
}
