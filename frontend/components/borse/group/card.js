import style from "../../../styles/borse/group/card.module.css";
import Link from "next/link";

export default function card({ name, group }) {
  return (
    <Link href={`/group/${group}`}>
      <div className={style.main}>
        <p className={style.head}>{name}</p>
        <p>({group} : کد گروه )</p>
      </div>
    </Link>
  );
}
