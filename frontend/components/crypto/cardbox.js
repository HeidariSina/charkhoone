import Link from "next/link";
import style from "../../styles/crypto/cardbox.module.css";

export default function card({ data }) {
  return (
    <div className={style.main}>
      <Link href={`/crypto/${data.id}`} passHref>
        <div className={style.div}>
          <div className={style.name}>
            <img src={data.thumb} className={style.img} alt={data.name} />
            <h1 className={style.h1}>{data.name}</h1>
          </div>
          <p className={style.para}>({data.symbol})</p>
          {data.market_cap_rank == null ? (
            <p>No Ranking</p>
          ) : (
            <p>Rank #{data.market_cap_rank}</p>
          )}
        </div>
      </Link>
    </div>
  );
}
