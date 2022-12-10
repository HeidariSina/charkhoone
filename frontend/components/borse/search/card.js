import style from "../../../styles/borse/search/card.module.css";
import Link from "next/link";

export default function card({ data }) {
  return (
    <Link href={`/borse/${data.attributes.inscode}`} passHref>
      <div className={style.card}>
        <p className={style.head}>{data.attributes.fullname}</p>
        <p>(نماد : {data.attributes.name})</p>
      </div>
    </Link>
  );
}
