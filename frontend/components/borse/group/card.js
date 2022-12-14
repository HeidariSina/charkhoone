import style from "../../../styles/borse/group/card.module.css";

export default function card({ name, group }) {
  return (
    <a href={`/group/${group}`} className={style.main}>
      <div className={style.div}>
        <p className={style.head}>{name}</p>
        <p>({group} : کد گروه )</p>
      </div>
    </a>
  );
}
